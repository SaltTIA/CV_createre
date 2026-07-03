import { useRef, useEffect, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapPickerProps {
  onAddressSelect: (address: string) => void;
  initialAddress?: string;
}

export function MapPicker({ onAddressSelect, initialAddress }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [expanded, setExpanded] = useState(false);
  // Keep onAddressSelect in a ref so reverseGeocode stays stable
  const onAddressSelectRef = useRef(onAddressSelect);
  onAddressSelectRef.current = onAddressSelect;

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    setLoading(true);
    setStatus('Locating...');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=en`
      );
      const data: any = await res.json();
      if (data && data.display_name) {
        onAddressSelectRef.current(data.display_name);
        setStatus('✔ Address set, verify above');
      }
    } catch {
      setStatus('⚠ Unable to fetch address, type manually');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!expanded || !mapRef.current) return;
    const timer = setTimeout(() => {
      if (!mapRef.current || mapInstanceRef.current) return;
      const map = L.map(mapRef.current, {
        center: [22.3193, 114.1694],
        zoom: 13,
        zoomControl: true,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng]).addTo(map);
        }
        reverseGeocode(lat, lng);
      });

      mapInstanceRef.current = map;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [expanded, reverseGeocode]);

  return (
    <div className="space-y-2 relative z-0">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        <MapPin size={16} />
        {expanded ? 'Close Map' : 'Open Map to Pick Location'}
      </button>
      {expanded && (
        <div className="relative z-0">
          <div
            ref={mapRef}
            style={{ height: '220px', width: '100%', borderRadius: '8px' }}
            className="border border-slate-200"
          />
          <div className="flex items-center justify-between mt-1">
            <span className={`text-xs ${status.includes("✔") ? "text-green-600" : status.includes("⚠") ? "text-amber-600" : "text-slate-400"}`}>
              {loading ? 'Locating...' : status || 'Click on the map to mark a location'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}