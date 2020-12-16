import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, ShowForm}) => {
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const ConfirmarFecha = (newDate) => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    setDate(newDate.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  //Time picker

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const ConfirmarHora = (newTime) => {
    const opciones = {hour: 'numeric', minute: '2-digit', hour12: false};
    setTime(newTime.toLocaleString('en-US', opciones));
    hideTimePicker();
  };

  //Crear nueva cita
  const CrearNuevaCita = () => {
    //Validar
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      date.trim() === '' ||
      time.trim() === '' ||
      sintomas.trim() === ''
    ) {
      //Falla la validacion
      mostrarAlerta();
      console.log(
        `${paciente.trim()} ${propietario.trim()} ${telefono.trim()} ${sintomas.trim()} ${date.trim()} ${time.trim()} `,
      );
      return;
    }

    const cita = {paciente, propietario, telefono, date, time, sintomas};

    cita.id = shortid.generate();

    const nuevaCita = [...citas, cita];

    setCitas(nuevaCita);

    ShowForm();
  };

  //Muestra la alerta si falla la validacion
  const mostrarAlerta = () => {
    Alert.alert('Error', 'Todos los campos son obligatorios', [
      {
        text: 'OK',
      },
    ]);
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setPaciente(texto)}
          />
        </View>

        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setPropietario(texto)}
          />
        </View>

        <View>
          <Text style={styles.label}>Telefono:</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(texto) => setTelefono(texto)}
          />
        </View>

        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Show Date Picker" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={ConfirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
          />
          <Text>Fecha: {date}</Text>
        </View>

        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Show Time Picker" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={ConfirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            isDarkModeEnabled={true}
          />
          <Text>Hora: {time}</Text>
        </View>

        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(texto) => setSintomas(texto)}
          />
        </View>

        <TouchableHighlight
          onPress={() => CrearNuevaCita()}
          style={styles.btnSubmit}>
          <Text style={styles.textoSubmit}>Submit</Text>
        </TouchableHighlight>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginTop: 10,
    marginBottom: 50,
  },
  textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
