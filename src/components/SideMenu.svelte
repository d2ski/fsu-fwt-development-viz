<script>
  import { fade, fly } from "svelte/transition";
  import email from "$svg/email.svg";
  import github from "$svg/github.svg";
  import twitter from "$svg/twitter.svg";
  import {showSideMenu} from "$stores/sideMenu.js";

  function closeMenu() {
    $showSideMenu = false;
    window.document.body.classList.toggle('no-scroll');
    window.document.body.style.paddingRight = null;
  }
</script>

{#if $showSideMenu}
  <aside class="side-menu" transition:fade>
    <div class="side-menu__background" on:click={closeMenu}>
      <div
        class="side-menu__foreground"
        on:click|stopPropagation
        transition:fly={{ x: 200, duration: 400 }}
      >
        <button
          class="side-menu__close-btn"
          aria-label="Close About"
          on:click={closeMenu}>&times;</button
        >
        <section>
          <h2 class="section__header">What is this site about?</h2>
          <p>
            OhMyChart! is a data-driven visualizations, infographics and visual
            stories focused on history and economy.
          </p>
          <p>
            <span class="side-menu__contacts-icon"
              ><a href="mailto:dmitrii@ohmychart.com">{@html email}</a></span
            >
            <span class="side-menu__contacts-icon"
              ><a href="https://github.com/ohmychart">{@html github}</a></span
            >
            <span class="side-menu__contacts-icon"
              ><a href="https://twitter.com/ohmychart">{@html twitter}</a></span
            >
          </p>
        </section>
      </div>
    </div>
  </aside>
{/if}

<style>
  .side-menu__background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(33, 33, 33, 0.65);
    z-index: 1000;
    overflow: auto;
  }

  .side-menu__foreground {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    max-width: 600px;
    background-color: #ffb495;
    z-index: 1001;
    overflow: auto;
  }

  .side-menu__close-btn {
    position: absolute;
    appearance: none;
    border: none;
    background-color: transparent;
    color: #212121;
    cursor: pointer;
    top: 1rem;
    right: 1rem;
    padding: 2px 8px;
    font-size: 32px;
    line-height: 32px;
    font-weight: 500;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s;
  }

  .side-menu__close-btn:hover {
    color: #fff;
    background-color: #400000;
  }

  .side-menu__contacts-icon {
    width: 36px;
    line-height: 0;
    margin: 8px;
    display: inline-block;
    cursor: pointer;
    transition: all 0.4s;
  }

  .side-menu__contacts-icon a {
    fill: #212121;
    transition: all 0.4s;
  }

  .side-menu__contacts-icon:hover a {
    fill: #fff;
  }

  .side-menu__contacts-icon:hover {
    transform: scale(1.1);
  }
</style>
