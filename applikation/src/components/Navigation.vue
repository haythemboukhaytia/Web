<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" class="nav fixed-top">
      <b-navbar-brand href="/">
        <img :src="require('../assets/Beuth-Logo_.png')" class="logo" alt="Kitten" />
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'Home' }" class="b-nav-item">Home</b-nav-item>
        <b-nav-item :to="{ name: 'Abbrecher' }" class="b-nav-item">Abbrecher</b-nav-item>
        <b-nav-item :to="{ name: 'Absolventen' }" class="b-nav-item">Absolventen</b-nav-item>
        <b-nav-item :to="{ name: 'Noten' }" class="b-nav-item">Noten</b-nav-item>
        <b-nav-item :to="{ name: 'Fächer' }" class="b-nav-item">Fächer</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navigation"
};
</script>
<style>
.logo {
  height: 80px;
  width: auto;
}
.nav {
  background-color: #00a5a5 !important;
}
.b-nav-item a {
  color: #ffffff !important;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}
.b-nav-item a:hover,
.b-nav-item a:active {
  border-bottom: 3px solid #ffffff;
}
</style>