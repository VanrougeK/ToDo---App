import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Animated,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import controller from "../controllers/TareaController";

const mascota = require("../assets/chibi_mascot.png");

export default function PantallaLista({ navigation }) {
  const [tareas, setTareas] = useState([]);
  const flotando = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flotando, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(flotando, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setTareas(controller.obtenerTodas());
    }, []),
  );

  const toggleTarea = (id) => {
    controller.toggleCompletada(id);
    setTareas(controller.obtenerTodas());
  };

  const eliminarTarea = (id) => {
    controller.eliminar(id);
    setTareas(controller.obtenerTodas());
  };

  const coloresPrioridad = {
    alta: "#ff8fab",
    media: "#ffb347",
    baja: "#b5ead7",
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTexto}>
          <Text style={styles.titulo}>☆┇ Mis Tareas</Text>
          <Text style={styles.subtitulo}>
            {tareas.length === 0
              ? "No tienes tareas aún"
              : `${tareas.filter((t) => t.completada).length} de ${tareas.length} completadas`}
          </Text>
        </View>

        <Animated.Image
          source={mascota}
          style={[styles.mascota, { transform: [{ translateY: flotando }] }]}
        />
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <View style={styles.tarjetaInfo}>
              <Text
                style={[
                  styles.tarjetaTitulo,
                  item.completada && styles.tachado,
                ]}
              >
                {item.titulo}
              </Text>
              <Text style={styles.tarjetaDesc}>{item.descripcion}</Text>
              <Text
                style={[
                  styles.prioridad,
                  { color: coloresPrioridad[item.prioridad] },
                ]}
              >
                ● {item.prioridad.toUpperCase()} — {item.fecha}
              </Text>
            </View>
            <Switch
              value={item.completada}
              onValueChange={() => toggleTarea(item.id)}
              trackColor={{ false: "#ffd6e7", true: "#ffb3c6" }}
              thumbColor={item.completada ? "#ff85a1" : "#fff"}
            />
            <TouchableOpacity onPress={() => eliminarTarea(item.id)}>
              <Text style={styles.btnEliminar}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>
            Presiona el botón para agregar una tarea
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.btnAgregar}
        onPress={() => navigation.navigate("Formulario")}
      >
        <Text style={styles.btnAgregarTexto}>+ Nueva Tarea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff0f6", padding: 16 },
  header: {
    backgroundColor: "#ffd6e7",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#ffb3c6",
    borderStyle: "dashed",
    overflow: "visible",
  },
  headerTexto: {
    flex: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ff85a1",
    fontStyle: "italic",
    letterSpacing: 1,
  },
  subtitulo: { color: "#ffb3c6", fontSize: 13, marginTop: 4 },
  mascota: {
    width: 90,
    height: 90,
    marginLeft: 10,
    resizeMode: "contain",
  },
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ffd6e7",
    shadowColor: "#ffb3c6",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tarjetaInfo: { flex: 1 },
  tarjetaTitulo: { fontSize: 16, fontWeight: "bold", color: "#ff85a1" },
  tachado: { textDecorationLine: "line-through", color: "#ccc" },
  tarjetaDesc: { fontSize: 13, color: "#aaa", marginTop: 2 },
  prioridad: { fontSize: 12, marginTop: 4, fontWeight: "bold" },
  btnEliminar: { fontSize: 20, marginLeft: 8 },
  btnAgregar: {
    backgroundColor: "#ff85a1",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#ff5c8a",
    shadowColor: "#ff85a1",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  btnAgregarTexto: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  vacio: { textAlign: "center", color: "#ffb3c6", marginTop: 30, fontSize: 14 },
});
