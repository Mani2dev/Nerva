<script setup>
  import { reactive, ref, computed } from 'vue'
  import Input from '@/components/blocks/Input.vue'
  import Button from '@/components/blocks/Button.vue'
  import bot from '@/assets/meta.js'


</script>

<template>
  <section class="auth--container">
    <div class="auth--contnet">

      <div class="auth--action--content">
        <div class="auth--form">
          <div class="auth--title">
            <h1>Welcome Back! <span>Emanuel</span></h1>
            <p><span>{{bot.name}}</span> has missed you since last time you were here</p>
          </div>

          <div class="auth--input--box">
            <label for="username">Username</label>
            <Input 
            id="username" 
            name="username" 
            style="padding: 20px 10px; background: var(--input-bg); border-radius: 30px;" placeholder="John Doe"
            />
          </div>

          <div class="auth--input--box">
            <label for="password">Password</label>
            <Input 
            id="password" 
            name="password" 
            type="password"
            style="padding: 20px 10px; background: var(--input-bg); border-radius: 30px;" placeholder="*********"
               />

          </div>

          <div class="auth--button--box">
           <Button
                style="width: 100%; transition: .3s ease; padding: 20px 10px; border-radius: 100px; color: var(--text-color); font-weight: 600; font-size: var(--font-nm); cursor: pointer;">
              LOG IN
              </Button>
          </div>
        </div>
      </div>

      <div class="auth--visual--contnet">
        <div class="auth--graphics"></div>
      </div>

    </div>
  </section>
</template>

<style scoped>
  .auth--container {
    width: 100vw;
    height: 100vh;
  }

  .auth--contnet {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: start;
  }

  .auth--action--content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    border-right: solid 1px var(--border-color);
  }

  .auth--form {
    padding: 20px;
    width: 85%;
    height: 85%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .auth--title {
    margin-bottom: 50px;
  }

  .auth--title h1 {
    font-weight: 500;
    font-size: var(--font-lg);
  }

  .auth--title h1 span {
    font-weight: 600;
    text-shadow: 0 0 20px green;
    color: green;
  }

  .auth--title p span {
    color: palevioletred;
    text-shadow: 0 0 10px violet;
  }

  .auth--title p {
    margin-top: 15px;
    font-weight: 200;
    font-size: var(--font-md);
  }

  .auth--input--box {
    position: relative;
    width: 90%;
    margin: 15px 0;
  }

  .auth--input--box input {
    margin-top: 15px;
  }

  .auth--input--box label {
    font-weight: 300;
  }

  .auth--button--box {
    width: 90%;
    margin-top: 25px;
  }

  .auth--visual--contnet {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ================= Border Beam (conic ring, real animated var) ================= */

  /* Register the animatable custom property for the angle */
  @property --beam-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  .auth--graphics {
    /* knobs */
    --beam-thickness: 3px;
    /* ring thickness */
    --beam-speed: 8s;
    /* rotation speed */
    --beam-angle: 0deg;
    /* animated by keyframes */
    --beam-core: rgba(255, 124, 148, 0.95);
    --beam-mid: rgba(255, 120, 40, 0.55);
    --beam-fade: rgba(255, 40, 80, 0.0);
    --beam-glow: 18px;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 95%;
    border-radius: 50px;
    background: var(--bg-sec);
    overflow: hidden;

    /* subtle static border under the beam */
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  }

  /* crisp ring */
  .auth--graphics::before,
  .auth--graphics::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: var(--beam-thickness);

    background:
      conic-gradient(from var(--beam-angle),
        var(--beam-fade) 0deg,
        var(--beam-fade) 10deg,
        var(--beam-core) 22deg,
        var(--beam-mid) 36deg,
        var(--beam-fade) 48deg,
        var(--beam-fade) 360deg);

    /* cut a hole to keep only the ring */
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;

    animation: spin-angle var(--beam-speed) linear infinite;
    will-change: background;
  }

  /* soft glow below the crisp ring */
  .auth--graphics::after {
    filter: blur(var(--beam-glow));
    opacity: 0.7;
  }

  /* Animate the registered custom property; works in scoped styles */
  @keyframes spin-angle {
    to {
      --beam-angle: 360deg;
    }
  }

  /* Optional: respect reduced motion */
  @media (prefers-reduced-motion: reduce) {

    .auth--graphics::before,
    .auth--graphics::after {
      animation: none;
    }
  }
</style>