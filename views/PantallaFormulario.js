import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { crearTarea } from "../models/Tarea";
import controller from "../controllers/TareaController";

export default function PantallaFormulario({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("media");

  const guardar = () => {
    const error = controller.validar(titulo, descripcion);
    if (error) {
      Alert.alert("⚠︎⁴⁰⁴ Error", error);
      return;
    }
    const nuevaTarea = crearTarea(titulo, descripcion, prioridad);
    controller.agregar(nuevaTarea);
    Alert.alert("✔ Guardado", "Tarea agregada correctamente", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>✐ᝰ Nueva Tarea</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ej: Estudiar para el examen"
          placeholderTextColor="#ffb3c6"
        />

        <Text style={styles.label}>Descripción *</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Describe la tarea..."
          placeholderTextColor="#ffb3c6"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Prioridad</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={prioridad} onValueChange={setPrioridad}>
            <Picker.Item label="🍒 Alta" value="alta" />
            <Picker.Item label="🍊 Media" value="media" />
            <Picker.Item label="🍋‍🟩 Baja" value="baja" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.btnGuardar} onPress={guardar}>
        <Text style={styles.btnTexto}>🗁 Guardar Tarea</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnCancelar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnCancelarTexto}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff0f6", padding: 16 },
  header: {
    backgroundColor: "#ffd6e7",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#ffb3c6",
    borderStyle: "dashed",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff85a1",
    fontStyle: "italic",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: "#ffd6e7",
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ff85a1",
    marginTop: 12,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff0f6",
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    borderWidth: 2,
    borderColor: "#ffd6e7",
    color: "#555",
  },
  inputMultiline: { height: 100, textAlignVertical: "top" },
  pickerContainer: {
    backgroundColor: "#fff0f6",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ffd6e7",
    overflow: "hidden",
  },
  btnGuardar: {
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
  btnTexto: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  btnCancelar: {
    alignItems: "center",
    marginTop: 12,
    padding: 10,
    marginBottom: 30,
  },
  btnCancelarTexto: { color: "#ffb3c6", fontSize: 15 },
});
