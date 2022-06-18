<template>
  <ul class="sidenav app-sidenav open ">
    <li>
    <router-link
      v-for='link in links'
      :key='link.url'
      :tag='li'
      active-class="active"
      :to='link.url'
      exact
    >
      {{link.title}}
    </router-link>
    </li>
  </ul>
</template>


<script>
export default {
  data: () => ({
    links: [
      {title:'Профиль', url: '/profile'},
      {title:'Мои банки заданий', url: '/btz_list'},
      {title:'Создать банк заданий', url: '/create_btz'}
    ]
  })
}
</script>
