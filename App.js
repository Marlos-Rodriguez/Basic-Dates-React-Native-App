import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

import Cita from './components/cita';
import Formulario from './components/formulario';

const App = () => {
  const [mostrarForm, setMostrarFrom] = useState(true);
  //State of Dates
  const [citas, setCitas] = useState([]);

  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
  };

  //Muestra o oculta formulario
  const ShowForm = () => {
    setMostrarFrom(!mostrarForm);
  };

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
        <View style={styles.contenedor}>
          <Text style={styles.title}>Administrador de Citas</Text>

          <View>
            <TouchableHighlight
              onPress={() => ShowForm()}
              style={styles.btnForm}>
              <Text style={styles.textoForm}>
                {mostrarForm ? 'Cancelar Cita' : 'Crear Cita'}
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.contenido}>
            {mostrarForm ? (
              <>
                <Text style={styles.title}>Crear Cita</Text>
                <Formulario
                  citas={citas}
                  setCitas={setCitas}
                  ShowForm={ShowForm}
                />
              </>
            ) : (
              <>
                <Text style={styles.title}>
                  {citas.length > 0 ? 'Administrada tus Citas' : 'No hay Citas'}
                </Text>
                <FlatList
                  style={styles.listado}
                  data={citas}
                  renderItem={({item}) => (
                    <Cita cita={item} eliminarPaciente={eliminarPaciente} />
                  )}
                  keyExtractor={(cita) => cita.id}
                />
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#AA076B',
  },
  title: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnForm: {
    padding: 10,
    backgroundColor: '#7d024e',
  },
  textoForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
