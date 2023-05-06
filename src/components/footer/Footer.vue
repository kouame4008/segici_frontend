<template>
<!-- footer start -->
<footer>
    <div class="footer-top">
        <div class="container-fluid">
            <div class="row align-item-center">
                <div class="col-lg-3 col-md-3">
                    <div class="footer-logo">
                        <a href="/"> <img src="@/assets/images/construct-logo.png" alt="footer-logo"> </a>
                    </div>
                </div>
                <div class="col-lg-9 col-md-9">
                    <div class="row">
                        <div class="col-lg-6 col-md-7">
                            <div class="footer-top-right-info">
                                <div class="footer-top-info-icon"> <span><i class="fas fa-envelope-open-text"></i></span> </div>
                                <div class="footer-top-info-text">
                                    <h2>Abonnez-vous à la newsletter</h2>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-5 footer-form">
                            <div class="footer-top-right-form">
                                <form>
                                    <input v-model="newsletter" id="txtEmail" class="subscribe-input" type="text" placeholder="Email" required>
                                    <button id="demo" type="button" class="submit-btn-btn" @click="handleNewsletter"><i class="fa fa-envelope"></i></button>
                                </form>
                            </div>
                            <div class="error-msg" id="error">
                                <p>Invalid email address</p>
                            </div>
                            <!-- <div class="success-msg" id="success">
                                <p><span class="check-success-icon"><i class="fa fa-check"></i></span>Email enregistré avec succès</p>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-middle">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-lg-3 col-md-6 item">
                    <div class="footer-block-list">
                        <h2 class="footer-middle-heading">A propos de nous</h2>
                        <p class="footer-middle-text">Nous sommes une agence immobilière qui a été créée en 2018 afin de permettre aux propriétaires et aux clients de pouvoir trouver plus facilement les biens immobiliers qu'ils recherchent et de trouver rapidement des clints pour leurs biens sur le marché tout simplement en passant par notre agence</p>
                    </div>
                </div>
                <div class="col-12 col-lg-3 col-md-6 item">
                    <div class="footer-block-list">
                        <h2 class="footer-middle-heading">liens utiles</h2>
                        <div class="footer-menu-list-wrapper">
                            <ul class="footer-menu-list">
                                <li> <a href="/">
                                        <CheckOutlined style="position : relative; top : -3px;color: #00A8FF" /> Accueil</a> </li>
                                <li> <a href="/">
                                        <CheckOutlined style="position : relative; top : -3px;color: #00A8FF" /> SEGICI</a> </li>
                                <li> <a href="/">
                                        <CheckOutlined style="position : relative; top : -3px;color: #00A8FF" /> Louer</a> </li>
                                <li> <a href="/">
                                        <CheckOutlined style="position : relative; top : -3px;color: #00A8FF" /> Acheter</a> </li>
                                <li> <a href="/">
                                        <CheckOutlined style="position : relative; top : -3px;color: #00A8FF" /> Biens</a> </li>
                                <li> <a href="/"><strong>Alouerici.com</strong>
                                        <SelectOutlined style="position : relative; top : -3px;color: #00A8FF" /></a> </li>
                            </ul>
                            <ul class="footer-menu-list">
                                <li> <a href="/">
                                        <CheckOutlined style="position : relative; top : -3px;color: #00A8FF" /> Besoin</a> </li>
                                <li> <a href="/">
                                        <CheckOutlined style="position : relative; top : -3px;color: #00A8FF" /> Résidences meublées</a> </li>
                                <li> <a href="/">
                                        <CheckOutlined style="position : relative; top : -3px;color: #00A8FF" /> Partenaires</a> </li>
                                <li> <a href="/">
                                        <CheckOutlined style="position : relative; top : -3px;color: #00A8FF" /> Espace pro</a> </li>
                                <li> <a href="/">
                                        <CheckOutlined style="position : relative; top : -3px;color: #00A8FF" /> Play-doo</a> </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-3 col-md-6 item">
                    <div class="footer-block-list">
                        <h2 class="footer-middle-heading">Contactez-nous</h2>
                        <div class="footercontact-list-item">
                            <div class="footercontact-list-icon"> <i class="fas fa-map-marked-alt"></i> </div>
                            <div class="footercontact-list-info">
                                <h2>ADRESSE PRINCIPALE</h2>
                                <p>Yamoussoukro
                                    <br>Mofaitai centre commercial
                                    <br></p>
                            </div>
                        </div>
                        <div class="footercontact-list-item">
                            <div class="footercontact-list-icon"> <i class="fas fa-phone-alt"></i> </div>
                            <div class="footercontact-list-info">
                                <h2>TELEPHONE ET EMAIL</h2>
                                <p><a href="#"> (+225) 0767090967</a>
                                    <br> <a href="#">infos@segici.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-3 col-md-6 item">
                    <div class="footer-block-list">
                        <h2 class="footer-middle-heading">Média sociaux</h2>
                        <div class="footer-post-list">
                            <div class="header-top-right-social f_right">
                                <ul>
                                    <li>
                                        <a href="#"> <i class="fab fa-facebook"></i> </a>
                                    </li>
                                    <li>
                                        <a href="#"> <i class="fab fa-twitter"></i> </a>
                                    </li>
                                    <li>
                                        <a href="#"> <i class="fab fa-instagram"></i> </a>
                                    </li>
                                    <li>
                                        <a href="#"> <i class="fab fa-linkedin"></i> </a>
                                    </li>
                                    <li>
                                        <a href="#"> <i class="fab fa-youtube"></i> </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-lg-6 col-md-6">
                    <p>Copyright © 2022 SEGICI. Tous droits réservés.</p>
                </div>
                <div class="col-12 col-lg-6 col-md-6">
                    <div class="terms-policy">
                        <span><a class="divide-icon" href="/">Termes & Conditions d'utilisations</a></span>
                        <span><a href="/">Politique de confidentialité</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
<!-- Modal -->
</template>

<script>
import {
    CheckOutlined,
    SelectOutlined
} from '@ant-design/icons-vue';
import {
    processData
} from '../../data/residences/residence-action';
import {
    AJOUTER_NEWSLETTER
} from '../../router/APIrouter';
import {
    notification
} from 'ant-design-vue';

export default {
    components: {
        CheckOutlined,
        SelectOutlined
    },
    data() {
        return {
            date: new Date(),
            newsletter: '',
        }
    },
    methods: {
        handleNewsletter() {
            if (this.newsletter == '') {
                return false;
            }
            let data = {
                email: this.newsletter
            }

            processData(AJOUTER_NEWSLETTER, data).then((res) => {
                if (res.status == "succes") {
                    notification.success({
                        message: res.message
                    });
                    this.newsletter = ""
                } else {
                    notification.error({
                        message: res.message,
                        placement : 'bottomRight'
                    });
                }
            })
        }
    }
}
</script>

<style lang="scss">
@import '../../scss/_variable.scss';

.footer-top-info-text {
    font-family: $fontFamily;
    ;
}

.footer-top-info-text p {
    line-height: 15px;
    font-size: 13px;
}
</style>
