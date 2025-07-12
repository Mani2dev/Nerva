<script setup>
    import Input from '~/components/blocks/Input.vue'
    import Button from '~/components/blocks/Button.vue'
    import { ref, reactive } from 'vue'




</script>

<template>
    <section class="auth__container">
        <div class="auth__content">
            <div class="auth__title">
                <h2>Login</h2>
            </div>

            <div class="auth__input__body">
                <div class="auth__input__box">
                    <label for="username">Username</label>
                    <Input
                        type="text"
                        name="username"
                        placeholder="e.g PenguinOnCocaine"
                        style="
                        padding: 15px;
                        "
                    />
                </div>

                <div class="auth__input__box">
                    <label for="pwd">Password</label>
                    <Input
                        type="password"
                        name="pwd"
                        placeholder="e.g *********"
                        style="
                        padding: 15px;
                        "
                    />
                </div>
            </div>
            <div class="auth__footer">
                <Button
                    value="Login"
                    style=
                    "
                    cursor: pointer;
                    background: var(--color-button-bg);
                    padding: 15px;
                    text-align: center;
                    color: var(--color-white);
                    font-size: var(--font-nm);
                    letter-spacing: .5px;
                    text-transform: uppercase;
                    font-weight: 500;
                    "
                />
            </div>
        </div>
    </section>
</template>

<style scoped>
    .auth__container {
        width: 100vw;
        height: 100vh;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .auth__content {
        position: relative;
        width: 45%;
        padding: 20px;
        border-radius: 10px;
        height: 45%;
        box-shadow: 0 0 10px var(--color-shadow);
        background: var(--color-surface);

        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
    }
    .auth__title {
        text-align: center;
    }
    .auth__title h2 {
        font-size: var(--font-md);
    }
    .auth__input__body{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 70%;
    }
    .auth__input__box {
        margin-bottom: 20px;
        width: 70%;
    }
    .auth__input__box input {
        margin-top: 10px !important;
    }
    .auth__footer {
        width: 70%;
    }
</style>