<script>
  import logo from "$svg/logo.svg";
</script>

<footer class="footer">
  <div class="footer__logo__icon">
    <a href="https://ohmychart.com">{@html logo}</a>
  </div>
</footer>

<style>
  .footer {
    background-color: #E0E0E0;
    height: 10vh;
    width: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: row;
    line-height: 0;
    align-items: center;
    justify-content: center;
    margin-top: 10rem;
  }

  .footer__logo__icon {
    width: 32px;
    margin: 0 1rem;
    display: inline-block;
    transition: 0.4s all;
  }

  .footer__logo__icon a {
    fill: #9E9E9E;
  }

</style>
