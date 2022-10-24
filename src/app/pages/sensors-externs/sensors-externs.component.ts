import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  ];
  tempListSensorsRadio1 = deepCopy(this.listSensorsRadio);
  tempListSensorsRadio2 = deepCopy(this.listSensorsRadio);

  listSensorsCard: SensorExterno[] = [];
  

  //Form
  public formSenExterno: FormGroup;
  mostrarForm: boolean = false;
  isBtnSubmitActive: boolean = true;
  disabledBtnradio: boolean = false;
  type2_cal1_input1_placeholder: string = '';
  type2_cal1_input2_placeholder: string = '';
  type2_cal2_input1_placeholder: string = '';
  type2_cal2_input2_placeholder: string = '';
  contChangeInputCal2 = 0;
  isRequiredInput: boolean = false;
  optionSensor: any = null;
  isCameraType: string = '';
  typeCal: number = 0;
  isCal2Exist: boolean = false;

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
  }

  ngOnInit(): void {
    this.nameSensorService.nombreSensor = "Sensores Externos";
    this.crudSensorExternoService.getSensorExterno().subscribe(sensorExterno => {
      //console.log("GET");
      //console.log(sensorExterno);
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
    this.isBtnSubmitActive = false;
    if(!this.isEdit) this.formSenExterno.reset();

    this.optionSensor = nameS;

    this.typeCal = typeCal;
    this.habilitarInputs(typeCal);

    if(nameS == 'Barómetro') {
      this.type2_cal2_input1_placeholder = this.type2_cal1_input1_placeholder = 'Presión'; 
      this.type2_cal2_input2_placeholder = this.type2_cal1_input2_placeholder = 'Altitud';
    } else if(nameS == 'Micrófono')  {
      this.type2_cal2_input1_placeholder = this.type2_cal1_input1_placeholder = 'Mínimo'; 
      this.type2_cal2_input2_placeholder = this.type2_cal1_input2_placeholder = 'Máximo';
    } else if(nameS == 'Cámara') {
      this.type2_cal1_input1_placeholder = 'Ancho (Trasera)'; 
      this.type2_cal1_input2_placeholder = 'Altura (Trasera)';
      this.type2_cal2_input1_placeholder = 'Ancho (Frontal)'; 
      this.type2_cal2_input2_placeholder = 'Altura (Frontal)';
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
    this.formSenExterno.reset();
    this.isBtnSubmitActive = true;
    if (this.isEdit) this.isEdit = false;
    this.habilitarInputs(0);
    this.vanishForm();
    this.tempListSensorsRadio1 = deepCopy(this.tempListSensorsRadio2);
  }

  isChangeCal2(valueInput: number) {
    if (valueInput != null) {
      console.log(valueInput.toString().length);
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
      this.formSenExterno.controls['cal2_value2'].disable();
      this.formSenExterno.controls['cal2_value3'].disable();
      this.formSenExterno.controls['cal2_value4'].disable();
      this.formSenExterno.controls['cal2_value5'].disable();

      this.contChangeInputCal2 = 0;
    }
    this.cdr.detectChanges();
  }

  isUpdate(sensorExterno: SensorExterno) {
    this.isCal2Exist = false;
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
    const response = await this.crudSensorExternoService.deleteSensorExterno(sensorExterno);
    //console.log(response);
  }

  async onSubmit() {
    if (!this.isEdit) {
      await this.crudSensorExternoService.addSensorExterno(this.cargarData());
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
