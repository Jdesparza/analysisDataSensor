import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudSensorExternoService } from 'src/app/services/crud-sensor-externo/crud-sensor-externo.service';
import { NameSensorService } from 'src/app/services/name-sensor/name-sensor.service';
import SensorExterno from 'src/app/interfaces/sensor-externo';
import { deepCopy } from '@angular-devkit/core/src/utils/object';

@Component({
  selector: 'app-sensors-externs',
  templateUrl: './sensors-externs.component.html',
  styleUrls: ['./sensors-externs.component.css']
})
export class SensorsExternsComponent implements OnInit {
  //sensor list
  listSensorsRadio = [
    {
      id: '1',
      name: 'De Proximidad',
      key: 'sensor_proximidad',
      isDisable: false,
      typeCal: 1,
      check: false,
    },
    {
      id: '2',
      name: 'De Luz',
      key: 'sensor_luz',
      isDisable: false,
      typeCal: 1,
      check: false,
    },
    {
      id: '3',
      name: 'Acelerómetro',
      key: 'sensor_acelerometro',
      isDisable: false,
      typeCal: 3,
      check: false,
    },
    {
      id: '4',
      name: 'Giroscopio',
      key: 'sensor_giroscopio',
      isDisable: false,
      typeCal: 3,
      check: false,
    },
    {
      id: '5',
      name: 'Magnetómetro',
      key: 'sensor_magnetometro',
      isDisable: false,
      typeCal: 3,
      check: false,
    },
    {
      id: '6',
      name: 'Podómetro',
      key: 'sensor_podometro',
      isDisable: false,
      typeCal: 1,
      check: false,
    },
    {
      id: '7',
      name: 'Cámara',
      key: 'sensor_camara',
      isDisable: false,
      typeCal: 2,
      check: false,
    },
    {
      id: '8',
      name: 'Barómetro',
      key: 'sensor_barometro',
      isDisable: false,
      typeCal: 2,
      check: false,
    },
    {
      id: '9',
      name: 'GPS',
      key: 'sensor_gps',
      isDisable: false,
      typeCal: 4,
      check: false,
    },
    {
      id: '10',
      name: 'Micrófono',
      key: 'sensor_microfono',
      isDisable: false,
      typeCal: 2,
      check: false,
    },
    {
      id: '11',
      name: 'Termómetro',
      key: 'sensor_termometro',
      isDisable: false,
      typeCal: 1,
      check: false,
    },
    {
      id: '12',
      name: 'Ritmo Cardíaco',
      key: 'sensor_ritmoCardiaco',
      isDisable: false,
      typeCal: 1,
      check: false,
    },
  ];
  tempListSensorsRadio1 = deepCopy(this.listSensorsRadio);
  tempListSensorsRadio2 = deepCopy(this.listSensorsRadio);

  listSensorsCard: SensorExterno[] = [];
  

  //Form
  public formSenExterno: FormGroup;
  mostrarForm: boolean = false;
  isBtnSubmitActive: boolean = true;
  disabledBtnradio: boolean = false;
  type2_input1_placeholder: string = '';
  type2_input2_placeholder: string = '';
  contChangeInputCal2 = 0;
  isRequiredInput: boolean = false;
  optionSensor: any = null;
  isCameraType: string = '';
  typeCal: number = 0;
  isCal2Exist: boolean = false;
  tooltipMessage1 = '';
  tooltipMessage2 = '';
  crudService;

  // Btn Form
  btnValidFormN: string = 'Agregar';
  
  //Card Edit
  isEdit: boolean = false;
  id: any = '';

  constructor(
    private nameSensorService: NameSensorService,
    private crudSensorExternoService: CrudSensorExternoService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
    ) { 
      this.formSenExterno = this.formBuilder.group({
        fabricante: [{value: '', disabled: true}, Validators.required],
        cal1_value1: [{value: '', disabled: true}, Validators.required],
        cal1_value2: [{value: '', disabled: true}, Validators.required],
        cal1_value3: [{value: '', disabled: true}, Validators.required],
        cal1_value4: [{value: '', disabled: true}, Validators.required],
        cal1_value5: [{value: '', disabled: true}, Validators.required],
        cal2_value1: [{value: '', disabled: true}],
        cal2_value2: [{value: '', disabled: true}],
        cal2_value3: [{value: '', disabled: true}],
        cal2_value4: [{value: '', disabled: true}],
        cal2_value5: [{value: '', disabled: true}],
      });
      this.crudService = crudSensorExternoService;
  }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Sensores Externos";
    this.crudSensorExternoService.getSensorExterno().subscribe(sensorExterno => {
      this.cargarDatos(sensorExterno);
    });
  }

  cargarDatos(sensorExterno: {
    forEach(arg0: (s: any) => void): unknown; 
    sensor: string; 
    id: string; 
    fabricante: string; 
    cal1: any; 
    cal2: any; 
}) {
    var icon = ''; 
    var cont = 0;

    this.listSensorsCard = [];
    this.tempListSensorsRadio1 = deepCopy(this.listSensorsRadio);

    sensorExterno.forEach(s => {
      if (s.sensor == 'De Proximidad') icon = 'ic_proximidad'; 
      if (s.sensor == 'De Luz') icon = 'ic_luz'; 
      if (s.sensor == 'Acelerómetro') icon = 'ic_acelerometro'; 
      if (s.sensor == 'Giroscopio') icon = 'ic_giroscopio'; 
      if (s.sensor == 'Magnetómetro') icon = 'ic_magnetometro'; 
      if (s.sensor == 'Podómetro') icon = 'ic_podometro'; 
      if (s.sensor == 'Cámara') icon = 'ic_camara'; 
      if (s.sensor == 'Barómetro') icon = 'ic_barometro'; 
      if (s.sensor == 'GPS') icon = 'ic_gps'; 
      if (s.sensor == 'Micrófono') icon = 'ic_microfono'; 
      if (s.sensor == 'Termómetro') icon = 'ic_termometro'; 
      if (s.sensor == 'Ritmo Cardíaco') icon = 'ic_ritmo_cardiaco'; 


      this.tempListSensorsRadio1 = this.tempListSensorsRadio1.map(radio => 
        radio.name === s.sensor? {...radio, isDisable: true} : radio
      );

      this.listSensorsCard[cont] = {
        id: s.id,
        icon: icon,
        sensor: s.sensor,
        fabricante: s.fabricante,
        cal1: s.cal1,
        cal2: s.cal2,
      };
      cont++;
    });
    this.vanishForm();
    this.tempListSensorsRadio2 = deepCopy(this.tempListSensorsRadio1);
  }

  isOptionRadio(nameS : any, typeCal: number) {
    this.tooltipMessage1 = this.tooltipMessage2 = '';
    this.isBtnSubmitActive = false;
    if(!this.isEdit) this.formSenExterno.reset();

    this.optionSensor = nameS;

    this.typeCal = typeCal;
    this.habilitarInputs(typeCal);

    if(nameS == 'Barómetro') {
      this.tooltipMessage1 = 'Presión en la Mañana';
      this.tooltipMessage2 = 'Presión en la Tarde';
      this.type2_input1_placeholder = 'Presión'; 
      this.type2_input2_placeholder = 'Altitud';
    } else if(nameS == 'Micrófono')  {
      this.tooltipMessage1 = 'Sonido en Cafetería UTPL';
      this.tooltipMessage2 = 'Sonido en Biblioteca UTPL';
      this.type2_input1_placeholder = 'Mínimo'; 
      this.type2_input2_placeholder = 'Máximo';
    } else if(nameS == 'Cámara') {
      this.tooltipMessage1 = 'Cámara Trasera';
      this.tooltipMessage2 = 'Cámara Frontal';
      this.type2_input1_placeholder = 'Ancho'; 
      this.type2_input2_placeholder = 'Altura';
    } else if(nameS == 'De Proximidad') {
      this.tooltipMessage1 = 'Proximación Corta';
      this.tooltipMessage2 = 'Proximación Larga';
    } else if(nameS == 'De Luz') {
      this.tooltipMessage1 = 'Iluminación Espacio Interno';
      this.tooltipMessage2 = 'Iluminación Espacio Externo';
    } else if(nameS == 'Acelerómetro' || nameS == 'Giroscopio') {
      this.tooltipMessage1 = 'Dispositivo Vertical';
      this.tooltipMessage2 = 'Dispositivo Horizontal';
    } else if(nameS == 'Podómetro') {
      this.tooltipMessage1 = 'Dar 10 Pasos';
      this.tooltipMessage2 = 'Dar 15 Pasos';
    } else if(nameS == 'GPS') {
      this.tooltipMessage1 = 'Ubicación la Cruz UTPL';
      this.tooltipMessage2 = 'Ubicación Canchas Deportivas UTPL (Al Fondo) ';
    } else if(nameS == 'Termómetro') {
      this.tooltipMessage1 = 'Temperatura en la Mañana';
      this.tooltipMessage2 = 'Temperatura al Medio Día';
    } else if(nameS == 'Ritmo Cardíaco') {
      this.tooltipMessage1 = 'Al Correr';
      this.tooltipMessage2 = 'Al Caminar';
    }
  }

  habilitarInputs(typeCal: number) {
    (typeCal >= 1)?this.formSenExterno.controls['fabricante'].enable() : this.formSenExterno.controls['fabricante'].disable();
    (typeCal >= 1)?this.formSenExterno.controls['cal1_value1'].enable() : this.formSenExterno.controls['cal1_value1'].disable();
    (typeCal >= 2)?this.formSenExterno.controls['cal1_value2'].enable() : this.formSenExterno.controls['cal1_value2'].disable();
    (typeCal >= 3)?this.formSenExterno.controls['cal1_value3'].enable() : this.formSenExterno.controls['cal1_value3'].disable();
    (typeCal == 4)?this.formSenExterno.controls['cal1_value4'].enable() : this.formSenExterno.controls['cal1_value4'].disable();
    (typeCal == 4)?this.formSenExterno.controls['cal1_value5'].enable() : this.formSenExterno.controls['cal1_value5'].disable();
    
    (typeCal >= 1)?this.formSenExterno.controls['cal2_value1'].enable() : this.formSenExterno.controls['cal2_value1'].disable();
    (typeCal >= 2 && this.isEdit && this.isCal2Exist)?this.formSenExterno.controls['cal2_value2'].enable() : this.formSenExterno.controls['cal2_value2'].disable();
    (typeCal >= 3 && this.isEdit && this.isCal2Exist)?this.formSenExterno.controls['cal2_value3'].enable() : this.formSenExterno.controls['cal2_value3'].disable();
    (typeCal >= 4 && this.isEdit && this.isCal2Exist)?this.formSenExterno.controls['cal2_value4'].enable() : this.formSenExterno.controls['cal2_value4'].disable();
    (typeCal >= 4 && this.isEdit && this.isCal2Exist)?this.formSenExterno.controls['cal2_value5'].enable() : this.formSenExterno.controls['cal2_value5'].disable();
  }

  vanishForm() {
    if (this.tempListSensorsRadio1.length == this.listSensorsCard.length) {
      if (!this.mostrarForm) this.mostrarForm = true;
    } else {
      if (this.mostrarForm) this.mostrarForm = false;
    }
  }

  btnCancelForm() {
    this.tooltipMessage1 = this.tooltipMessage2 = '';
    this.formSenExterno.reset();
    this.isBtnSubmitActive = true;
    if (this.isEdit) this.isEdit = false;
    this.habilitarInputs(0);
    this.vanishForm();
    this.tempListSensorsRadio1 = deepCopy(this.tempListSensorsRadio2);
  }

  isChangeCal2(valueInput: number) {
    if (valueInput != null) {
      //console.log(valueInput.toString().length);
      this.isCal2Exist = true;
      if (valueInput.toString().length >= 1 && this.contChangeInputCal2 == 0) {
        this.isRequiredInput = true;

        (this.typeCal >= 2)?this.formSenExterno.controls['cal2_value2'].enable() : this.formSenExterno.controls['cal2_value2'].disable();
        (this.typeCal >= 3)?this.formSenExterno.controls['cal2_value3'].enable() : this.formSenExterno.controls['cal2_value3'].disable();
        (this.typeCal == 4)?this.formSenExterno.controls['cal2_value4'].enable() : this.formSenExterno.controls['cal2_value4'].disable();
        (this.typeCal == 4)?this.formSenExterno.controls['cal2_value5'].enable() : this.formSenExterno.controls['cal2_value5'].disable();

        
        this.contChangeInputCal2++;
      } 
    } else if(valueInput == null && this.contChangeInputCal2 > 0) {
      //this.isCal2Exist = false;
      this.formSenExterno.controls['cal2_value2'].disable();
      this.formSenExterno.controls['cal2_value3'].disable();
      this.formSenExterno.controls['cal2_value4'].disable();
      this.formSenExterno.controls['cal2_value5'].disable();

      this.contChangeInputCal2 = 0;
    }
    this.cdr.detectChanges();
  }

  isUpdate(sensorExterno: SensorExterno) {
    //console.log(sensorExterno.cal2[0])
    if(sensorExterno.cal2[0] != undefined) this.isCal2Exist = true;
    else if(sensorExterno.cal2[0] == undefined) this.isCal2Exist = false;
    this.habilitarInputs(0);
    this.isEdit = true;
    var typeRadio: any;
    this.id = sensorExterno.id;

    //console.log(sensorExterno);

    this.tempListSensorsRadio1 = deepCopy(this.listSensorsRadio);
    this.tempListSensorsRadio1 = this.tempListSensorsRadio1.map(radio => 
      radio.name === sensorExterno.sensor? {...radio, check: true, isDisable: false} : 
      radio.name != sensorExterno.sensor? {...radio, isDisable: true} : radio
    );

    this.btnValidFormN = 'Actualizar';
    if (this.mostrarForm) this.mostrarForm = false;

    typeRadio = this.tempListSensorsRadio1.find(function(radio: { name: string | undefined; }) {
      return radio.name === sensorExterno.sensor
    })?.typeCal;

    // Llenado campos
    this.formSenExterno.controls['fabricante'].setValue(sensorExterno.fabricante);
    this.formSenExterno.controls['cal1_value1'].setValue(sensorExterno.cal1[0]);
    this.formSenExterno.controls['cal1_value2'].setValue(sensorExterno.cal1[1]);
    this.formSenExterno.controls['cal1_value3'].setValue(sensorExterno.cal1[2]);
    this.formSenExterno.controls['cal1_value4'].setValue(sensorExterno.cal1[3]);
    this.formSenExterno.controls['cal1_value5'].setValue(sensorExterno.cal1[4]);
    this.formSenExterno.controls['cal2_value1'].setValue(sensorExterno.cal2[0]);
    this.formSenExterno.controls['cal2_value2'].setValue(sensorExterno.cal2[1]);
    this.formSenExterno.controls['cal2_value3'].setValue(sensorExterno.cal2[2]);
    this.formSenExterno.controls['cal2_value4'].setValue(sensorExterno.cal2[3]);
    this.formSenExterno.controls['cal2_value5'].setValue(sensorExterno.cal2[4]);

    this.isOptionRadio(sensorExterno.sensor, typeRadio);
    this.cdr.detectChanges();
  }

  async isDelete(sensorExterno: SensorExterno) {
    if (this.isEdit && sensorExterno.sensor == this.optionSensor) {
      this.isEdit = false;
      this.formSenExterno.reset();
      this.btnValidFormN = 'Agregar'
      this.habilitarInputs(0);
    }
    await this.crudSensorExternoService.deleteSensorExterno(sensorExterno)
  }

  async onSubmit() {
    this.tooltipMessage1 = this.tooltipMessage2 = '';
    if (!this.isEdit) {
      await this.crudSensorExternoService.addSensorExterno(this.cargarData())
    } else {
      //console.log(this.formSenExterno.value);
      await this.crudSensorExternoService.updateSensorExterno(this.id, this.cargarData());
      this.isEdit = false;
      this.btnValidFormN = 'Agregar';
    }
    this.isBtnSubmitActive = true;
    this.formSenExterno.reset();
    this.habilitarInputs(0);
  }

  cargarData() {
    let cal1: number[] = new Array;
    let cal2: number[] = new Array;

    for (var i = 0; i < 5; i++) {
      if(this.formSenExterno.value[`cal1_value${i + 1}`] != undefined && this.formSenExterno.value[`cal1_value${i + 1}`] != null) 
        cal1[i] = this.formSenExterno.value[`cal1_value${i + 1}`];
    }

    for (var i = 0; i < 5; i++) {
      if(this.formSenExterno.value[`cal2_value${i + 1}`] != undefined && this.formSenExterno.value[`cal2_value${i + 1}`] != null) 
        cal2[i] = this.formSenExterno.value[`cal2_value${i + 1}`];
    }

    let data = {
      sensor: this.optionSensor,
      fabricante: this.formSenExterno.value['fabricante'],
      cal1: cal1,
      cal2: cal2,
    };

    //console.log(data);

    return data;
  }

}
