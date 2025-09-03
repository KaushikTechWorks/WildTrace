"use client";

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Props {
  data: any; // mockData shape
  filters: { species: boolean; sanctuaries: boolean; schoolProjects: boolean };
  onSelect: (type: 'species'|'sanctuary'|'schoolProject', item: any) => void;
  mapboxToken?: string;
  onLoad?: () => void;
  onError?: (msg: string) => void;
}

export default function MapboxMap({ data, filters, onSelect, mapboxToken, onLoad, onError }: Props) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapboxToken) {
      onError?.('Mapbox access token is required');
      return;
    }
    if (!containerRef.current) return;

    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [20, 20],
      zoom: 2
    });

    map.on('load', () => {
      onLoad?.();
      const features: any[] = [];

      if (filters.species) {
        data.species.forEach((s: any) => {
          features.push({
            type: 'Feature',
            properties: { sourceType: 'species', id: s.id, payload: JSON.stringify(s) },
            geometry: { type: 'Point', coordinates: s.location }
          });
        });
      }

      if (filters.sanctuaries) {
        data.sanctuaries.forEach((s: any) => {
          features.push({
            type: 'Feature',
            properties: { sourceType: 'sanctuary', id: s.id, payload: JSON.stringify(s) },
            geometry: { type: 'Point', coordinates: s.location }
          });
        });
      }

      if (filters.schoolProjects) {
        data.schoolProjects.forEach((p: any) => {
          features.push({
            type: 'Feature',
            properties: { sourceType: 'schoolProject', id: p.id, payload: JSON.stringify(p) },
            geometry: { type: 'Point', coordinates: p.location }
          });
        });
      }

      const geojson = { type: 'FeatureCollection', features };

      if (map.getSource('conservation')) {
        (map.getSource('conservation') as mapboxgl.GeoJSONSource).setData(geojson as any);
      } else {
        map.addSource('conservation', {
          type: 'geojson',
          data: geojson,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50
        } as any);

        map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'conservation',
          filter: ['has', 'point_count'],
          layout: {
            // hide cluster circles visually; clusters still exist in source
            visibility: 'none'
          },
          paint: {
            'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 10, '#f1f075', 30, '#f28cb1'],
            'circle-radius': ['step', ['get', 'point_count'], 15, 10, 20, 30, 25]
          }
        });

  // Intentionally do not add the 'cluster-count' symbol layer so numeric
  // labels don't appear on cluster circles. Clusters still render as
  // circles from the 'clusters' layer above, and clicking them still
  // zooms/expands the cluster.

        map.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'conservation',
          filter: ['!', ['has', 'point_count']],
          paint: {
            // color by sourceType: species (red), sanctuary (green), schoolProject (blue)
            'circle-color': [
              'match',
              ['get', 'sourceType'],
              'species', '#ef4444',
              'sanctuary', '#16a34a',
              'schoolProject', '#2563eb',
              /* default */ '#11b4da'
            ],
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
          }
        });
      }

      map.on('click', 'unclustered-point', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] });
        if (!features || !features.length) return;
        const props = features[0].properties as any;
        const payload = props?.payload ? JSON.parse(props.payload) : props.payload;
        const sourceType = props?.sourceType;
        onSelect(sourceType, payload || props);
      });

      map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        if (!features || !features.length) return;
        const clusterId = (features[0].properties as any).cluster_id;
        const source = map.getSource('conservation') as mapboxgl.GeoJSONSource;
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          const geom = features[0].geometry as any;
          const coords = Array.isArray(geom?.coordinates) ? geom.coordinates : (geom?.coordinates || null);
          if (!coords) return;
          map.easeTo({ center: coords as [number, number], zoom: zoom as number, duration: 500 });
        });
      });

      mapRef.current = map;
    });

    return () => {
      // defensive cleanup: store current map, clear ref, then attempt remove()
      const m = mapRef.current;
      mapRef.current = null;
      if (m && typeof m.remove === 'function') {
        try {
          m.remove();
        } catch (err) {
          // Mapbox internals can sometimes be in a partial state (plugins or submodules
          // missing) which causes remove() to throw. Swallow the error but log for debug.
          // This prevents the whole app from crashing on rapid remounts/updates.
          // eslint-disable-next-line no-console
          console.warn('Mapbox remove() threw an error during cleanup:', err);
          try {
            // best-effort attempt to detach event listeners then remove
            if ((m as any).off) (m as any).off();
            if ((m as any).remove) (m as any).remove();
          } catch (e) {
            // final fallback: ignore
          }
        }
      }
    };
  }, [data, filters, onSelect, mapboxToken]);

  // Fill the parent container height so outer layout controls total page height
  return <div ref={containerRef} className="w-full h-full" />;
}
