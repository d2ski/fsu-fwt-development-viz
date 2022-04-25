<script>
  export let id;
  export let size = 3;
  export let fill;
</script>

<marker
  {id}
  viewBox="0 0 {size * 2} {size * 2}"
  refX={size}
  refY={size}
  markerWidth={size}
  markerHeight={size}
>
  <circle cx={size} cy={size} r={size} {fill}/>
</marker>
