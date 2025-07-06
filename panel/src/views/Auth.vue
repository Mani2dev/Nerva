<script setup>
    import { ref, reactive  } from 'vue'
    import Input from '@/components/blocks/Input.vue'
    import Button from '@/components/blocks/Button.vue'

    const username = ref('')
    const password = ref('')
    const error_msg = reactive({ usr: '', pwd: '' })
    const regex = new RegExp("^(?=.*[A-Z])(?=.*[,.!?#])[a-zA-Z0-9,.!?#]{8,}$")


    const checkCreds = (e) => {
        e.preventDefault();
        if(username.value.length < 5 || username.value.length == 5) {
            error_msg.usr ='Username needs to be atleast 6 characters long...'
            return 0
        }
        else {
            error_msg.msg = ''
        }

        if(!regex.test(password.value)) {
            error_msg.pwd = 'Password needs to have at least 8 characters, including Upeprcase letter, numbers [0-9] and a sign [, . ! ?]'
        }
    }

</script>

<template>
    <section class="auth__container">
        <div class="auth__content">
            <div class="auth__title">
                <h1>Login</h1>
            </div>
            <form @submit="checkCreds" method="POST" >
                <div class="auth__box">
                    <label for="usr__hld">Username</label>
                    <Input 
                        type="text" 
                        name="usr__hld" 
                        required 
                        v-model="username"
                    />
                    <p style="color: #e07070;">{{error_msg.usr}}</p>
                </div>
                <div class="auth__box">
                    <label for="pw__hld">Password</label>
                    <Input 
                        type="text" 
                        name="pw__hld" 
                        required  
                        v-model="password"
                        />
                        <p style="color: #e07070;">{{error_msg.pwd}}</p>
                </div>
                <div class="auth__footer">
                    <Button 
                        value="Login"
                        type="submit"
                        style="
                        text-transform: uppercase;
                        font-weight: 600;
                        "
                    />
                </div>
            </form>
        </div>
    </section>
</template>

<style scoped>
    .auth__container {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .auth__content {
        width: 35%;
        background: var(--color-surface);
        border-radius: 8px;
        padding: 20px;
    }

    .auth__title {
        text-align: center;
        margin-bottom: 50px;
    }

    .auth__title h1 {
        font-size: var(--font-lg);
    }

    .auth__content form {
        width: 100%;
        height: 100%;
    }

    .auth__box {
        position: relative;
        display: flex;
        gap: 5px;
        flex-direction: column;
        width: 100%;
        margin-bottom: 20px;
    }
</style>