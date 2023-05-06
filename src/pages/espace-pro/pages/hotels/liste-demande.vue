<template>
<section>
    <a-page-header :breadcrumb="{ routes }">
        <template #title>
            Demandes de réservations 
        </template>
    </a-page-header>

    <div class="row justify-content-center mb-4">
        <div class="col-md-8">
            <a-form>
                <div class="row">
                    <div class="col-md-5">
                        <a-form-item>
                            <label for="" class="d-block text-left">Date arrivée</label>
                            <a-date-picker v-model:value="dateDebut" class="inputItemField" :locale="locale" :format="dateFormat"  />
                        </a-form-item>
                    </div>
                    <div class="col-md-5">
                        <a-form-item>
                            <label for="" class="d-block text-left">Date depart</label>
                            <a-date-picker v-model:value="dateFin" class="inputItemField" :locale="locale" :format="dateFormat" />
                        </a-form-item>
                    </div>
                    <div class="col-md-2">
                        <a-form-item>
                            <label for="" class="d-block text-left" :style="{opacity : 0}">Date fin</label>
                            <a-button type="primary" size="large" @click="handleSearch" :loading="searchLoad">RECHERCHER</a-button>
                        </a-form-item>
                    </div>
                </div>
            </a-form>
        </div>
    </div>
    <div class="row justify-content-center my-4">
        <div class="col-md-8">
            <a-typography-title :level="3"> {{ demandes.length }} DEMANDE(S) TROUVÉE(S) DU {{ moment(dateDebut).format('DD-MM-YYYY') }} AU {{ moment(dateFin).format('DD-MM-YYYY') }} </a-typography-title>
        </div>
    </div>
    <section>
        <div class="row">
            <div class="col-md-12">
                <a-spin :spinning="searchLoad">
                    <a-table :columns="columns" :data-source="demandes">
                        <template #indice="{ index }">
                            <a>{{ index+1 }}</a>
                        </template>

                        <template #image="{ record }">
                            <img v-if="record.image_salle != null" :src="
                    API + '/fichier/photo_de_salle/' + record.image_salle" style="width: 60px;height: 60px;border-radius: 100px;cursor: pointer;" />
                        </template>

                        <template #demandeur="{ record }">
                            <div>
                                <span>
                                    {{ record.libelle_civilite }} {{ record.nom_demandeur }} {{ record.prenom_demandeur }}
                                </span>
                            </div>
                            <a-popover title="Demandeur">
                                <template #content>
                                    <p class="mb-0">
                                        <strong>Téléphone : </strong> {{ record.telephone_demandeur }}
                                    </p>
                                    <p class="mb-0">
                                        <strong>Email : </strong> {{ record.email_demandeur }}
                                    </p>
                                    <p class="mb-0">
                                        <strong>Type de pièce : </strong> {{ record.type_piece_demandeur }}
                                    </p>
                                    <p class="mb-0">
                                        <strong>Numéro de pièce : </strong> {{ record.numero_piece_demandeur }}
                                    </p>
                                    <p class="mb-0">
                                        <strong>Nombre de personne : </strong>
                                        <template v-for="i in parseInt (record.nombre_personne)" :key="i">
                                            <UserAddOutlined :style="{position : 'relative', top : '-3px'}" />
                                        </template>
                                    </p>
                                    <p class="mb-0">
                                        <strong>Date d'arrivée : </strong> {{ moment(record.date_debut).format ('DD-MM-YYYY') }}
                                    </p>
                                    <p class="mb-0">
                                        <strong>Date de départ : </strong> {{ moment(record.date_fin).format ('DD-MM-YYYY') }}
                                    </p>
                                </template>
                                <a-button type="primary" class="popbtn">
                                    + Details
                                </a-button>
                            </a-popover>
                        </template>

                        <template #titre_residence="{ record }">
                            <span class="mr-2">
                                <span>
                                    {{ record.nom_hotel }}
                                </span>

                            </span>
                            <a-popover title="Info hôtel">
                                <template #content>
                                    <p class="m-0">
                                        <strong>Secteur : </strong> {{ record.secteur_hotel }}
                                    </p>
                                    <p class="m-0">
                                        <strong>Quartier : </strong> {{ record.quartier_hotel }}
                                    </p>
                                </template>
                                <InfoCircleFilled :style="{color : 'rgb(245, 106, 0)', fontSize : '20px'}" />
                            </a-popover>

                            <div>
                                Céer le :
                                <CalendarOutlined :style="{position : 'relative', top : '-5px'}" /> {{ moment(record.created_at).format ('DD-MM-YYYY') }}
                            </div>
                             <div>
                                Chambre : <i class="fas fa-person-booth"></i> <strong>{{record.libelle_salle }}</strong>
                            </div>
                        </template>

                        <template #tarif={record}>
                            <a-button type="primary" shape="" size="small"><strong> {{formatteurMillier (record.prix_salle)}} </strong></a-button>
                        </template>

                        <template #etat_occupation={record}>
                            <a-tag v-if="record.etat_demande == 1" class="d-flex justify-content-center" color="red" :style="{width : '80px', height : '25px', borderRadius : '10px', background: 'rgb(234, 33, 33)', fontWeight : 'bold'}">
                                Traité
                            </a-tag>
                            <a-tag v-else color="blue" class="d-flex justify-content-center" :style="{width : '80px', height : '25px', borderRadius : '10px', background: '#1be61b', fontWeight : 'bold'}">
                                En attente
                            </a-tag>
                        </template>

                        <template #action="{record}">
                            <a-space>
                               <a-tooltip title="Traiter" v-if="record.etat_demande == 0">
                                     <a-button type="primary" @click="changeVisibleModal (record) " shape="circle">
                                    <CheckOutlined :style="{position : 'relative', top : '-5px',color : '#FFF'}" />
                                </a-button>
                               </a-tooltip>
                               <span v-if="record.etat_demande == 1">
                                   <span> Validé le : {{ moment (record.date_validation).format ('DD/MM/YYYY') }}</span>
                               </span>

                            </a-space>
                        </template>
                    </a-table>
                </a-spin>
            </div>
        </div>
    </section>
    <a-modal v-model:visible="visible" :footer="false" @cancel="handleCancel" class="ep-panel">
        <template #title>
            <strong>VALIDER UNE DEMANDE</strong>
        </template>
        <div class="alert" v-if="verif" :class="verifClass ? 'alert-success' : 'alert-danger'">
            {{ verificationText }}
        </div>
        <a-form>
            <div class="row">
                <div class="col-md-6">
                    <a-form-item>
                        <label for="" class="d-block text-left">Date d'arrivée</label>
                        <a-date-picker v-model:value="form.date_debut" class="inputItemField" :locale="locale" :format="dateFormat"  />
                    </a-form-item>
                </div>
                <div class="col-md-6">
                    <a-form-item>
                        <label for="" class="d-block text-left">Date de départ</label>
                        <a-date-picker v-model:value="form.date_fin" class="inputItemField" :locale="locale" :format="dateFormat" :disabled-date="disabledDate" />
                    </a-form-item>
                </div>
                <div class="col-md-12">
                    <div class="mt-3">
                        <div class="d-flex justify-content-center">
                            <a-space>
                                <a-button type="danger" :loading="verificationLoad" @click="handleVerification">VERIFIER LA DISPONIBILITE</a-button>
                                <a-button type="primary" :loading="verificationLoad" :disabled="disabled" @click="validerDemande">VALIDER LA DEMANDE</a-button>
                            </a-space>
                        </div>
                    </div>
                </div>
            </div>
        </a-form>
    </a-modal>
</section>
</template>

<script>
import {
    processDataAuth,
} from '../../../../data/process-auth';
import {
    API,
    EP_LISTE_DEMANDE_HOTEL,
    EP_VERIFICATION_HOTEL,
    EP_RESERVATION_HOTEL_CHAMBRE
} from '../../../../router/APIrouter';
import {
    formatteurMillier
} from '../../../../helpers/ServicesHelpers';
import {
    InfoCircleFilled,
    UserAddOutlined,
    CheckOutlined,
    CalendarOutlined
} from '@ant-design/icons-vue';

import locale from "ant-design-vue/es/date-picker/locale/fr_FR";
import moment from "moment";
import {
    notification
} from 'ant-design-vue';

const routes = [{
    path: 'index',
    breadcrumbName: 'Etablissement',
}, ];

const columns = [{
        key: 'indice',
        width: 50,
        slots: {
            customRender: 'indice',
        },
    },
    {
        title: 'Image',
        key: 'image',
        width: 100,
        slots: {
            customRender: 'image',
        },
    },
    {
        title: 'Demandeur',
        key: 'nom_demandeur',
        slots: {
            customRender: 'demandeur',
        },
    },
    {
        title: "Etablissement",
        key: "titre_residence",
        dataIndex: "titre_residence",
        slots: {
            customRender: "titre_residence",
        },
    },
    {
        title: "Tarif/nuitée",
        key: "tarif",
        dataIndex: "tarif",
        slots: {
            customRender: "tarif",
        },
    },
    {
        title: "Statut",
        key: "etat_occupation",
        dataIndex: "etat_occupation",
        slots: {
            customRender: "etat_occupation",
        },
    },
    {
        title: 'Actions',
        align: 'right',
        key: 'action',
        slots: {
            customRender: 'action',
        },
    },
];

export default {
    components: {
        InfoCircleFilled,
        UserAddOutlined,
        CheckOutlined,
        CalendarOutlined
    },
    data() {
        return {
            routes,
            loading: true,
            demandes: [],
            columns,
            API,
            formatteurMillier,
            dateFormat: "DD/MM/YYYY",
            locale,
            moment,
            dateDebut: moment().format('YYYY-MM-DD'),
            dateFin: moment().add('day', 3).format('YYYY-MM-DD'),
            visible: false,
            verificationLoad: false,
            form: {
                date_debut: '',
                date_fin: ''
            },
            current: null,
            verif: false,
            verificationText: '',
            verifClass: false,
            disabled: false,
            searchLoad: false
        }
    },
    methods: {
        listeDemandeHotel() {
            this.searchLoad = true;
            let data = new FormData();
            data.append('date_debut', moment(this.dateDebut).format('YYYY-MM-DD'));
            data.append('date_fin', moment(this.dateFin).format('YYYY-MM-DD'));

            processDataAuth(EP_LISTE_DEMANDE_HOTEL, data).then((res) => {
                this.searchLoad = false;
                this.demandes = res.resultat;
            })
        },
        handleSearch() {
            this.listeDemandeHotel();
        },
        changeVisibleModal(record) {
            this.form.date_debut = record.date_debut
            this.form.date_fin = record.date_fin
            this.current = record;
            this.visible = !this.visible;

            this.handleVerification();
        },
        handleCancel() {
            this.visible = false;
        },
        handleVerification() {
            this.verificationLoad = !this.verificationLoad;
            let data = new FormData();
            data.append('date_debut', moment(this.form.date_debut).format('YYYY-MM-DD'));
            data.append('date_fin', moment(this.form.date_fin).format('YYYY-MM-DD'));
            data.append('chambre_id', this.current.chambre_id);

            processDataAuth(EP_VERIFICATION_HOTEL, data).then((res) => {
                this.verificationLoad = !this.verificationLoad;
                this.verif = true;
                if (res.statut == 'succes') {
                    if (res.resultat == 0) {
                        this.verifClass = true;
                        this.verificationText = res.message
                        this.disabled = false
                    } else {
                        this.verifClass = false
                        this.verificationText = res.message
                        this.disabled = true
                    }
                }
            })
        },

        validerDemande() {
            this.verificationLoad = !this.verificationLoad;
            let data = new FormData();

            data.append('date_debut', moment(this.form.date_debut).format('YYYY-MM-DD'));
            data.append('date_fin', moment(this.form.date_fin).format('YYYY-MM-DD'));
            data.append('chambre_id', this.current.chambre_id);
            data.append('demande_id', this.current.id);

            processDataAuth(EP_RESERVATION_HOTEL_CHAMBRE, data).then((res) => {
                this.verificationLoad = !this.verificationLoad;
                if (res.statut == 'succes') {
                    notification.success({
                        message: res.message
                    });
                    this.visible = false;
                    this.listeDemandeHotel ();
                } else {
                    notification.error({
                        message: res.message,
                        placement: 'bottomRight'
                    });
                }
            })
        },
        disabledDate(current) {
            // Can not select days before today and today
            console.log (current)
            return current && current < moment(this.form.date_debut);
        }

    },
    mounted() {
        this.listeDemandeHotel();
    }

}
</script>

<style>
.ant-breadcrumb {
    text-align: left;
}

.popbtn {
    margin-top: 10px;
    background: #002870 !important;
    border: 0 !important;
    border-radius: 20px !important;
}

.inputItemField div,
.ant-calendar-picker-input.ant-input {
    height: 100% !important
}

.ep-panel .ant-modal-body {
    background: #FFF;
}
</style>
