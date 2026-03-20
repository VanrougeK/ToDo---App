import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PantallaLista from "./views/PantallaLista";
import PantallaFormulario from "./views/PantallaFormulario";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Lista"
        screenOptions={{
          headerStyle: { backgroundColor: "#ffd6e7" },
          headerTintColor: "#ff85a1",
          headerTitleStyle: { fontWeight: "bold", fontStyle: "italic" },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Lista"
          component={PantallaLista}
          options={{ title: "☆┇ Mis Tareas" }}
        />
        <Stack.Screen
          name="Formulario"
          component={PantallaFormulario}
          options={{ title: "✐ᝰ Nueva Tarea" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
