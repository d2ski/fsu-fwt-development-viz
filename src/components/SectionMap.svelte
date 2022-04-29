<script>
    import map1988 from "$data/map-1988-s.json";
    import map1993 from "$data/map-1993-s.json";

    import Map from '$components/Map.svelte';

    const width = 600;
    const height = 600;

</script>

<section>
    <div class="map-wrapper">
        <div class="map-small">
            <Map data={map1988} width=200 height=200 scale=1.2 rotate=45 center={[123, -9]} />
        </div>
        <div class="map-large">
            <Map data={map1993} {width} {height} scale=3.7 rotate=45 center={[123.4, -9]} isHoverable=true />
        </div>
        <div class="map-note">Map is hoverable</div>
    </div>
    
    
</section>

<style>
    .map-wrapper {
        position: relative;
        display: inline-block;
        border: 2px solid #e0e0e0;
    }

    .map-small {
        display: inline-block;
        position: absolute;
        top: 8px;
        right: 8px;
        border: 2px solid #e0e0e0;
        z-index: 999;
    }

    .map-note {
        display: inline-block;
        position: absolute;
        bottom: 8px;
        right: 8px;
        font-size: 1rem;
        color: #9E9E9E;
    }
</style>

