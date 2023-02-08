import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { runInContext } from 'vm';

//Declarar mapboxgl es una libreria global por eso solo se declara
declare var mapboxgl: any;

@Component({
  selector: 'app-tab3-mapa',
  templateUrl: './tab3-mapa.page.html',
  styleUrls: ['./tab3-mapa.page.scss'],
})
export class Tab3MapaPage implements OnInit {

  constructor(private route: ActivatedRoute) { }
  latitud: number;
  longitud: number;

  ngOnInit() {
    let geo: any = this.route.snapshot.paramMap.get('geo');
    geo = geo?.substring(4);
    geo = geo.split(',');

    this.latitud = Number(geo[0]);
    this.longitud = Number(geo[1]);

    console.log(this.latitud, this.longitud)

  }

  //Se ejecuta 
  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWx2aXNyb3NhIiwiYSI6ImNsZGVrZGNidzBlaDIzcXF6cmlzYTQ2azgifQ.9pSS3DpN9u_KyeuEAA0Wbg';
    const map = new mapboxgl.Map({
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/light-v11',
      center: [this.longitud, this.latitud],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });

    map.on('style.load', () => {

      //Vuelve a generar el mapa en esas dimensiones
      map.resize();

      //marcador
      new mapboxgl.Marker().setLngLat([this.longitud, this.latitud])
        .addTo(map);



      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer: any) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });
  }

}
