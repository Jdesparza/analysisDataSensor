import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudSensorExternoService } from 'src/app/services/crud-sensor-externo/crud-sensor-externo.service';
import { ErrorRateService } from 'src/app/services/error-rate-model/error-rate-model.service';
import { SensoresSmartphonesService } from 'src/app/services/sensores-smartphones/sensores-smartphones.service';
import { deepCopy } from '@angular-devkit/core/src/utils/object';

import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-graph-sensors',
  templateUrl: './graph-sensors.component.html',
  styleUrls: ['./graph-sensors.component.css']
})
export class GraphSensorsComponent implements OnInit {

  @Input() infoSensorSmartphone:any;

  listSensorSmartphone: any;
  tempListSensorSmartphone: any;
  //listSensoresExternos: any[] = [{}];
  calSensorExterno: any;

  // Gráficas
  checkRadioFilter = [
    {
      id: '1',
      value: 5,
      check: true,
    },
    {
      id: '2',
      value: 10,
      check: false,
    },
    {
      id: '3',
      value: 15,
      check: false,
    },
  ];
  filterControlForm: FormGroup;
  marcaModeloForm = 'modelo';
  cantDatosMostrarForm = 5;
  
  graficData: any;
  labelsGrafic: string[] = [];
  dataErrorGrafic: number[] = [];
  dataExactitudGrafic: number[] = [];

  barColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private sensoresSmartphoneService: SensoresSmartphonesService,
    private crudSensorExternoService: CrudSensorExternoService,
    private errorRateService: ErrorRateService,
  ) { 
    this.filterControlForm = this.formBuilder.group({
      controlMarcaModelo: [this.marcaModeloForm],
      controlCantDatos: [this.cantDatosMostrarForm.toString(), Number],
    });
  }

  ngOnInit(): void {
    this.data();
  }

  data() {
    this.crudSensorExternoService.getSensorExterno().subscribe(sensorsExterns => {
      this.calSensorExterno  = sensorsExterns.find((senExt: { sensor: string; }) => {return senExt.sensor === this.infoSensorSmartphone[1]});;
    });
    this.sensoresSmartphoneService.getSensorSmartphoneExist(this.infoSensorSmartphone[0]).subscribe(sensorSmartphone => {
      this.listSensorSmartphone = sensorSmartphone;
      this.tempListSensorSmartphone = deepCopy(this.listSensorSmartphone);
      this.graficSmartphoneModelMenosFallos();
    });
  }

  //Grafica

  onSubmitGraficFilter() {
    if (this.marcaModeloForm != this.filterControlForm.value['controlMarcaModelo'] || this.cantDatosMostrarForm != Number(this.filterControlForm.value['controlCantDatos'])) {
      this.marcaModeloForm = this.filterControlForm.value['controlMarcaModelo'];
      this.cantDatosMostrarForm = Number(this.filterControlForm.value['controlCantDatos']);
  
      this.graficSmartphoneModelMenosFallos();
    }
  }

  graficSmartphoneModelMenosFallos() {
    let sensorFalloMediaCalculada: any;
    let smartMenosFallos: [{modelo: string; marca: string; fallo: number;}];
    let dataObjects: [{modelo: string; marca: string; fallo: number;}];

    //limpiar Datos Grafic
    this.labelsGrafic = [];
    this.dataErrorGrafic = [];
    this.dataExactitudGrafic = [];

    //let contForEachDataGrafic = 0;

    if (this.calSensorExterno != undefined) {
      sensorFalloMediaCalculada = this.errorRateService.smartphoneMediaEquation(this.tempListSensorSmartphone, this.calSensorExterno, this.infoSensorSmartphone[1]);

      dataObjects = this.errorRateService.mediaModelMarcaDuplicados(sensorFalloMediaCalculada, this.marcaModeloForm);
      smartMenosFallos = this.errorRateService.smartphoneMenosFallos(dataObjects);

      for (var i = 0; i < smartMenosFallos.length; i++) {
        if (this.marcaModeloForm == 'modelo') this.labelsGrafic[i] = smartMenosFallos[i].modelo.toUpperCase();
        else if (this.marcaModeloForm == 'marca') this.labelsGrafic[i] = smartMenosFallos[i].marca.toUpperCase();
        this.dataErrorGrafic[i] = smartMenosFallos[i].fallo;
        this.dataExactitudGrafic[i] = (100 - smartMenosFallos[i].fallo);
        if (smartMenosFallos.length >= this.cantDatosMostrarForm && (i + 1) == this.cantDatosMostrarForm) break;
      }

      this.barChartData = {
        labels: this.labelsGrafic,
        datasets: [
          { data: this.dataErrorGrafic, label: 'Error',  hidden: false, backgroundColor: ['#fd7986'] },
          { data: this.dataExactitudGrafic, label: 'Exactitud',  hidden: true, backgroundColor: ['#ffff50'] },
        ]
      };
    }
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };

  public barChartData: ChartData<'bar'> = {
    datasets: []
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [ DataLabelsPlugin ];

}
