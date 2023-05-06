<template>
<section>
    <a-page-header :breadcrumb="{ routes }">
        <template #title>
            Liste réservations
        </template>
    </a-page-header>

    <div class="row justify-content-center mb-4">
        <div class="col-md-8">
            <a-form>
                <div class="row">
                    <div class="col-md-5">
                        <a-form-item>
                            <label for="" class="d-block text-left">Date début</label>
                            <a-date-picker v-model:value="dateDebut" class="inputItemField" :locale="locale" :format="dateFormat" />
                        </a-form-item>
                    </div>
                    <div class="col-md-5">
                        <a-form-item>
                            <label for="" class="d-block text-left">Date fin</label>
                            <a-date-picker v-model:value="dateFin" class="inputItemField" :locale="locale" :format="dateFormat" />
                        </a-form-item>
                    </div>
                    <div class="col-md-2">
                        <a-form-item>
                            <label for="" class="d-block text-left" :style="{opacity : 0}">Date fin</label>
                            <a-button type="primary" size="large" @click="handleSearch" :loading="spinning">RECHERCHER</a-button>
                        </a-form-item>
                    </div>
                </div>
            </a-form>
        </div>
    </div>
    <div class="row justify-content-center my-4">
        <div class="col-md-8">
            <a-typography-title :level="3"> {{ demandes.length }} RESERVATION(S) TROUVÉE(S) DU {{ moment(dateDebut).format('DD-MM-YYYY') }} AU {{ moment(dateFin).format('DD-MM-YYYY') }} </a-typography-title>
        </div>
    </div>
    <section>
        <div class="row">
            <div class="col-md-12">
                <a-spin :spinning="spinning">
                    <a-table :columns="columns" :data-source="demandes">
                        <template #indice="{ index }">
                            <a>{{ index+1 }}</a>
                        </template>

                        <template #image="{ record }">
                            <img v-if="record.image_residence != null" :src="
                    API + '/fichier/photo_de_bien/' + record.image_residence" style="width: 60px;height: 60px;border-radius: 100px;cursor: pointer;" />
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
                                        <strong>Type de pièce : </strong> {{ record.type_piece }}
                                    </p>
                                    <p class="mb-0">
                                        <strong>Numéro de pièce : </strong> {{ record.numero_piece }}
                                    </p>
                                    <p class="mb-0">
                                        <strong>Nombre de personne : </strong>
                                        <template v-for="i in parseInt (record.nbre_personne)" :key="i">
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
                                    {{ record.titre_residence }}
                                </span>

                            </span>
                            <a-popover title="Info résidence">
                                <template #content>
                                    <p class="m-0">
                                        <strong>Secteur : </strong> {{ record.secteur }}
                                    </p>
                                    <p class="m-0">
                                        <strong>Quartier : </strong> {{ record.quartier }}
                                    </p>
                                    <p class="m-0">
                                        <strong>Type logement : </strong> {{ record.libelle_type_maison }}
                                    </p>
                                </template>
                                <InfoCircleFilled :style="{color : 'rgb(245, 106, 0)', fontSize : '20px'}" />
                            </a-popover>

                            <div>
                                Céer le :
                                <CalendarOutlined :style="{position : 'relative', top : '-5px'}" /> {{ moment(record.created_at).format ('DD-MM-YYYY') }}
                            </div>
                            <div>
                                Tarif : <a-button type="primary" shape="round" size="small"><strong> {{formatteurMillier (record.tarif)}} </strong></a-button>
                            </div>
                        </template>

                        <template #date_demande={record}>
                            <span class="d-block"> <b>
                                    <CalendarOutlined :style="{position : 'relative', top : '-5px'}" /> {{ moment(record.dem_debut).format ('DD/MM/YYYY') }}</b> </span>
                            <span class="d-block"><b>
                                    <CalendarOutlined :style="{position : 'relative', top : '-5px'}" /> {{ moment(record.dem_fin).format ('DD/MM/YYYY') }} </b></span>
                        </template>

                        <template #reserver={record}>
                            <span class="d-block"> <b>
                                    <CalendarOutlined :style="{position : 'relative', top : '-5px'}" /> {{ moment(record.date_debut).format ('DD/MM/YYYY') }}</b> </span>
                            <span class="d-block"><b>
                                    <CalendarOutlined :style="{position : 'relative', top : '-5px'}" /> {{ moment(record.date_fin).format ('DD/MM/YYYY') }} </b></span>
                        </template>

                        <template #action="{record}">
                            <a-space>
                                <a-tooltip title="Libérer" v-if="record.etat_reservation == 1">
                                    <a-popconfirm title="Voulez-vous vraiment liberer ?" @confirm="handleActionLiberer (record)" okText="Oui, liberer" cancelText="Non">
                                        <a-button type="primary" shape="circle">
                                            <ImportOutlined :style="{position : 'relative', top : '-5px',color : '#FFF'}" />
                                        </a-button>
                                    </a-popconfirm>
                                </a-tooltip>
                                <span v-if="record.date_sorti">
                                    <a-tag color="blue"> Sorti le : {{ moment (record.date_sorti).format ('DD/MM/YYYY') }}</a-tag>
                                </span>
                                <span v-if="record.date_annulation">
                                    <a-tag color="red"> Annulé le : {{ moment (record.date_annulation).format ('DD/MM/YYYY') }}</a-tag>

                                    <a-popover title="MOTIF">
                                        <template #content>
                                            <p class="m-0">
                                                {{ record.motif_annulation }}
                                            </p>
                                        </template>
                                        <InfoCircleFilled :style="{color : '#FF0000', fontSize : '20px'}" />
                                    </a-popover>
                                </span>

                                <a-tooltip title="Annuler" v-if="record.annuler == 1">
                                    <a-popconfirm title="Voulez-vous vraiment annuler ?" @confirm="openModal (record)" okText="Oui" cancelText="Non">
                                        <a-button shape="circle" type="danger">
                                            <CloseOutlined :style="{position : 'relative', top : '-5px',color : '#FFF'}" />
                                        </a-button>
                                    </a-popconfirm>
                                </a-tooltip>
                            </a-space>
                        </template>
                    </a-table>
                </a-spin>
            </div>
        </div>
    </section>

    <a-modal v-model:visible="visible" title="ANNULER RESERVATION" :footer="false" @cancle="handleCancel" class="ep-panel">
        <div class="">
            <label for="">Motif d'annulation</label>
            <a-textarea placeholder="Motif d'annulation" v-model:value="annulation" />
            <div class="form-group mt-3">
                <a-button type="primary" @click="handleActionAnnuler" :loading="spinning">Annuler la reservation</a-button>
            </div>
        </div>
    </a-modal>

</section>
</template>

<script>
import {
    processDataAuth,
} from '../../../../data/process-auth';
import {
    API,
    EP_VERIFIER_RESERVATION_RESIDENCE,
    EP_VALIDER_RESERVATION,
    EP_LISTE_RESERVATION,
    EP_LIBERER_RESERVATION,
    EP_ANNULER_RESERVATION
} from '../../../../router/APIrouter';
import {
    formatteurMillier
} from '../../../../helpers/ServicesHelpers';
import {
    InfoCircleFilled,
    UserAddOutlined,
    ImportOutlined,
    CalendarOutlined,
    CloseOutlined
} from '@ant-design/icons-vue';

import locale from "ant-design-vue/es/date-picker/locale/fr_FR";
import moment from "moment";
import {
    notification
} from 'ant-design-vue';

const routes = [{
    path: 'index',
    breadcrumbName: 'Résidences',
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
        key: 'demandeur',
        slots: {
            customRender: 'demandeur',
        },
    },
    {
        title: "Titre résidence",
        key: "titre_residence",
        dataIndex: "titre_residence",
        slots: {
            customRender: "titre_residence",
        },
    },
    {
        title: "Date demande",
        key: "date_debut",
        dataIndex: "date_debut",
        slots: {
            customRender: "date_demande",
        },
    },
    {
        title: "Reserver pour le :",
        key: "date_debut",
        dataIndex: "date_debut",
        slots: {
            customRender: "reserver",
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
        ImportOutlined,
        CalendarOutlined,
        CloseOutlined
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
            spinning: false,
            record: null,
            annulation: ''
        }
    },
    methods: {
        listeReservation() {
            this.spinning = !this.spinning;
            let data = new FormData();
            data.append('date_debut', moment(this.dateDebut).format('YYYY-MM-DD'));
            data.append('date_fin', moment(this.dateFin).format('YYYY-MM-DD'));

            processDataAuth(EP_LISTE_RESERVATION, data).then((res) => {
                this.spinning = !this.spinning;
                this.demandes = res.resultat;
            })
        },
        handleSearch() {
            this.listeReservation();
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
            data.append('residence_id', this.current.residence_id);

            processDataAuth(EP_VERIFIER_RESERVATION_RESIDENCE, data).then((res) => {
                this.verificationLoad = !this.verificationLoad;
                this.verif = true;
                if (res.statut == 'succes') {
                    if (res.resultat == 0) {
                        this.verifClass = true;
                        this.verificationText = "Cette date est disponible"
                        this.disabled = false
                    } else {
                        this.verifClass = false
                        this.verificationText = "Cette date est indisponible"
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
            data.append('residence_id', this.current.residence_id);
            data.append('demande_id', this.current.id);

            processDataAuth(EP_VALIDER_RESERVATION, data).then((res) => {
                this.verificationLoad = !this.verificationLoad;
                if (res.statut == 'succes') {
                    notification.success({
                        message: res.message
                    });
                    this.visible = false;
                } else {
                    notification.error({
                        message: res.message,
                        placement: 'bottomRight'
                    });
                }
            })
        },
        handleActionLiberer(record) {
            this.spinning = !this.spinning;
            let data = new FormData();
            data.append('reservation_id', record.id);

            processDataAuth(EP_LIBERER_RESERVATION, data).then((res) => {
                this.spinning = !this.spinning;
                if (res.status == 'succes') {
                    notification.success({
                        message: res.message
                    });
                    this.listeReservation();
                } else {
                    notification.error({
                        message: res.message,
                        placement: 'bottomRight'
                    });
                }
            })

        },
        openModal(record) {
            this.record = record;
            this.visible = true;
        },
        handleActionAnnuler() {
            this.spinning = !this.spinning;
            let data = new FormData();
            data.append('reservation_id', this.record.id);
            data.append('motif', this.annulation);

            processDataAuth(EP_ANNULER_RESERVATION, data).then((res) => {
                this.spinning = !this.spinning;
                if (res.status == 'succes') {
                    notification.success({
                        message: res.message
                    });
                    this.spinning = false;
                    this.visible = false;
                    this.annulation = ''
                    this.listeReservation();
                } else {
                    notification.error({
                        message: res.message,
                        placement: 'bottomRight'
                    });
                }
            })

        },

    },
    mounted() {
        this.listeReservation();
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
