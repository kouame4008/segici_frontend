<template>
<section id="login">
    <div class="authentication-wrapper authentication-3">
        <div class="authentication-inner">

            <div class="d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5">
                <div class="ui-bg-overlay bg-dark opacity-50"></div>

                <div class="w-100 text-white px-5">
                    <h1 class="login-text font-weight-bolder mb-4"> Bienvenue sur <br> <span style="color:white;"> la
                            plateforme de gestion immobilière <br> <span style="color : rgb(0, 168, 255)">SEGICI</span>.</span></h1>

                </div>
            </div>
            <div class="d-flex col-lg-4 align-items-center bg-white p-5">

                <div class="d-flex col-sm-7 col-md-5 col-lg-12 px-0 px-xl- mx-auto">
                    <div class="w-100">

                        <div class="d-flex justify-content-center align-items-center">
                            <div class="w-100">
                                <div class="w-100 position-relative justify-content-center d-flex">
                                    <img width="150px" style="margin-right: 30px;" src="@/assets/images/segici_logo_150.png" alt="Iucap Education" class="img-responsive">
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>

                        <h4 class="text-center text-lighter font-weight-normal mt-5 mb-0 vertus-font">
                            Connexion à votre compte
                        </h4>
                        <br>

                        <form action="" class="espace-pro-login" @submit.prevent="handleSubmitLogin">
                            <div class="form-group">
                                <label for="" class="login-label">
                                    Nom d'utilisateur
                                </label>
                                <input v-model="values.email" type="text" class="form-control" placeholder="Nom d'utilisateur" name="email" @blur="validate('email')" @keypress="validate('email')">
                                <p class="form-input-hint text-danger" v-if="!!errors.email">
                                    {{ errors.email }}
                                </p>
                            </div>

                            <div class="form-group">
                                <label for="" class="login-label">
                                    Mot de passe
                                </label>
                                <input v-model="values.password" type="password" class="form-control" placeholder="mot de passe" name="password" @blur="validate('password')" @keypress="validate('password')">
                                <p class="form-input-hint text-danger" v-if="!!errors.password">
                                    {{ errors.password }}
                                </p>
                            </div>

                            <div class="form-group mt-4">
                                <a-button type="primary" class="w-100" size="large" :loading="chargement" htmlType="submit">S'AUTHENTIFIER</a-button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
</template>

<script>
import * as Yup from "yup";
import {
    process_action
} from '../../../data/auth/process-action';
import {
    EP_LOGIN_USER
} from '../../../router/APIrouter';
import {
    mapActions,
    mapGetters
} from 'vuex';

const loginFormSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required()
});

export default {
    data() {
        return {
            formLayout: 'horizontal',
            chargement: false,
            values: {
                email: "",
                password: "",
            },
            errors: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        handleSubmitLogin() {
            loginFormSchema
                .validate(this.values, {
                    abortEarly: false
                })
                .then(() => {
                    this.errors = {};
                    this.chargement = !this.chargement;
                    // login the user
                    // console.log(this.values);
                    let data = new FormData();
                    data.append('login_user', this.values.email);
                    data.append('password_user', this.values.password);

                    process_action(EP_LOGIN_USER, data).then((res) => {
                        this.chargement = !this.chargement;
                        if (res.status == "succes") {
                            this.actionInLogged(res)
                            // let user = res.resultat.civilite_user +' '+res.resultat.nom_user+' '+res.resultat.prenom_user
                            // message.info(user);
                            // this.$router.push({
                            //     name: 'Dashboard'
                            // })
                            window.location.href="/espace-pro/dashboard";

                        } else {
                            this.$notification.error({
                                message: res.message,
                                placement: 'bottom-right'
                            })
                        }
                    })

                })
                .catch(err => {
                    err.inner.forEach(error => {
                        this.errors[error.path] = error.message;
                    });
                });
        },
        validate(field) {
            loginFormSchema
                .validateAt(field, this.values)
                .then(() => {
                    this.errors[field] = "";
                })
                .catch(err => {
                    this.errors[field] = err.message;
                });
        },
        ...mapActions(['actionInLogged'])
    },
    created() {
        // alert ('sad')
        if (this.isAuth) {
            this.$router.push({
                name: 'Dashboard'
            })
        }
    },
    computed: {
        ...mapGetters(['isAuth'])
    },
};
</script>

<style lang="scss">
@import '../../../scss/_variable.scss';

.authentication-wrapper {
    display: flex;
    flex-basis: 100%;
    min-height: 100vh;
    width: 100%
}

.authentication-wrapper .authentication-inner {
    width: 100%
}

.authentication-wrapper.authentication-1,
.authentication-wrapper.authentication-2,
.authentication-wrapper.authentication-4 {
    align-items: center;
    justify-content: center
}

.authentication-wrapper.authentication-1 .authentication-inner {
    max-width: 300px
}

.authentication-wrapper.authentication-2 .authentication-inner {
    max-width: 380px
}

.authentication-wrapper.authentication-3 {
    align-items: stretch;
    justify-content: stretch
}

.authentication-wrapper.authentication-3 .authentication-inner {
    display: flex;
    align-items: stretch;
    flex-wrap: nowrap;
    justify-content: stretch
}

.authentication-wrapper.authentication-4 .authentication-inner {
    max-width: 800px
}

@media all and (-ms-high-contrast:none),
(-ms-high-contrast:active) {
    .authentication-wrapper:after {
        content: '';
        display: block;
        flex: 0 0 0;
        min-height: inherit;
        width: 0;
        font-size: 0
    }
}

.login-text {
    font-family: 'Mochiy Pop P One', sans-serif;
    color: #FFF;
    line-height: 1.5cm;
    font-size: 30px
}

.vertus-font {
    font-family: "Versus", "Poppins", sans-serif;
    font-size: 35px;
    width: 300px;
    line-height: 40px;
    text-transform: uppercase;
    width: 100%;
    color: #000 !important;
}

.ant-form-item-control {
    line-height: 25px !important;
}

.login-label {
    font-weight: bold;
    color: #000 !important;

}

.ui-bg-overlay-container {
    background: $secondary_color;
}

.espace-pro-login .form-control {
    height: 40px !important;
    border-color: $primary_color;
}

.espace-pro-login .form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: $primary_color;
    outline: 0;
    box-shadow: unset !important
}
</style>
