import {Component} from '@angular/core';
import {Config, NavController, ModalController} from 'ionic-angular';
import {PropertyService} from '../../providers/property-service-mock';
import {PropertyDetailPage} from '../property-detail/property-detail';
import leaflet from 'leaflet';
import { WalkthroughModalPage } from '../popup/popup-modal';
import { Content, Innovation, Team } from '../../models/innovation';



@Component({
    selector: 'page-innovation-list',
    templateUrl: 'Innovation-list.html'
})
export class InnovationListPage {

    properties: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;


    constructor(public navCtrl: NavController, public service: PropertyService, public config: Config,
        public modalCtrl: ModalController) {
        this.findAll();
    }

    openPropertyDetail(property: any) {
        this.navCtrl.push(PropertyDetailPage, property);
    }

    openWalkthroughModal() {
       this.openModal('WalkthroughModalPage');
    }

    openModal(pageName) {
        console.log(pageName);
        this.modalCtrl.create(WalkthroughModalPage, null, { cssClass: 'inset-modal' })
                      .present();
    }
    onInput(event) {
        this.service.findByName(this.searchKey)
            .then(data => {
                this.properties = data;
                if (this.viewMode === "map") {
                    this.showMarkers();
                }
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    onCancel(event) {
        this.findAll();
    }

    findAll() {
        this.service.findAll()
            .then(data => this.properties = data)
            .catch(error => alert(error));
    }

    showMap() {
        setTimeout(() => {
            this.map = leaflet.map("map").setView([42.361132, -71.070876], 14);
            leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.showMarkers();
        })
    }

    showMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        this.properties.forEach(property => {
            if (property.lat, property.long) {
                let marker: any = leaflet.marker([property.lat, property.long]).on('click', event => this.openPropertyDetail(event.target.data));
                marker.data = property;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }
    public innovationList: Innovation[] = [{
        title: 'Chandrayan - 2',
        description: 'Chandrayaan-2 will be launched on India\'s Geosynchronous Satellite Launch Vehicle (GSLV-MkII) in the last quarter of 2018',
        team: {
            name: 'ISRO'

        } as Team,
        status: 'prototype',
        thumbnail: 'assets/thumbnails/chandrayaan.jpg',
    },
        {
            title: 'GSAT-11',
            description: 'GSAT-11 is based on I-6K bus which is under advanced stage of development.',
            team: {
                name: 'ISRO'

            } as Team,
            status: 'completed',
            content: {
                url: 'https://www.youtube.com/embed/3qM0_dzyTjY',
                type: 'video',
            } as Content,
            thumbnail: 'assets/thumbnails/gsat-11.jpg',
        },
        {
            title: 'Mangalyaan 2 ',
            description: 'India\'s second interplanetary mission planned for launch to Mars by the Indian Space Research Organisation (ISRO) in the 2021-2022 time frame. It will consist of an orbiter, and may include a lander and a rover.',
            team: {
                name: 'ISRO'

            } as Team,
            status: 'completed',
            content: {
                url: 'https://www.youtube.com/embed/OIKunbW-Ch4',
                type: 'video',
            } as Content,
            thumbnail: 'assets/thumbnails/mangalyaan.jpg',
        },
        {
            title: 'Apollo program',
            description: 'Brought first human to the Moon',
            team: {
                name: 'NASA'

            } as Team,
            status: 'completed',
            thumbnail: 'assets/thumbnails/apollo.png',
        },{
            title: 'Skylab',
            description: 'The crewed missions only took place in 1973 and 1974; first American space station\n',
            team: {
                name: 'NASA'

            } as Team,
            status: 'completed',
            thumbnail: 'assets/thumbnails/skylab.png',
        },{
            title: 'Space Shuttle',
            description: 'First missions in which a spacecraft was reused',
            team: {
                name: 'NASA'

            } as Team,
            status: 'completed',
            thumbnail: 'assets/thumbnails/space-shuttle.png',
        }
    ];

    public navigateToDetails(innovation: Innovation) {
        this.navCtrl.push('InnovationDetailsPage', {
            selectedInnovation: innovation,
            innovationList: this.innovationList
        });
    }

}
