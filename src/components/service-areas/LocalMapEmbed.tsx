import React, { useState } from "react";
import { MapPin, Navigation, ExternalLink, Layers, Building2, Landmark, Compass } from "lucide-react";
import { StateServiceArea, StateLandmark } from "../../data/serviceAreasData";
import { cn } from "../../lib/utils";

interface LocalMapEmbedProps {
  stateData: StateServiceArea;
}

export function LocalMapEmbed({ stateData }: LocalMapEmbedProps) {
  // Currently active landmark (or null if general state view)
  const [activeLandmark, setActiveLandmark] = useState<StateLandmark | null>(
    stateData.landmarks.length > 0 ? stateData.landmarks[0] : null
  );

  // Compute map search query
  const query = activeLandmark
    ? activeLandmark.query
    : `${stateData.capital}, ${stateData.name}, Nigeria`;

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    query
  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const directGoogleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#090d16] to-[#040812] overflow-hidden shadow-2xl">
      {/* Map Header Bar */}
      <div className="p-5 md:p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-mw-orange uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Local SEO Geo-Targeting & Territory Map</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <span>{stateData.name} Commercial Landmarks & Economic Centers</span>
          </h3>
          <p className="text-xs text-white/60">
            Interactive map centered on key business hubs across {stateData.shortName}.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 font-mono">
            {stateData.coordinates.lat.toFixed(4)}° N, {stateData.coordinates.lng.toFixed(4)}° E
          </div>
          <a
            href={directGoogleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-mw-orange/10 hover:bg-mw-orange/20 text-mw-orange hover:text-white border border-mw-orange/20 text-xs font-semibold transition-colors"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Landmark Selector Tabs */}
      {stateData.landmarks.length > 0 && (
        <div className="px-5 md:px-6 py-3 border-b border-white/5 bg-black/40 overflow-x-auto scrollbar-none flex items-center gap-2">
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-mw-orange" />
            <span>Economic Landmarks:</span>
          </span>

          {stateData.landmarks.map((landmark) => {
            const isSelected = activeLandmark?.name === landmark.name;
            return (
              <button
                key={landmark.name}
                onClick={() => setActiveLandmark(landmark)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs transition-all shrink-0 flex items-center gap-1.5 border",
                  isSelected
                    ? "bg-mw-orange text-white border-mw-orange shadow-md shadow-mw-orange/20 font-semibold"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border-white/10"
                )}
              >
                <MapPin className={cn("w-3 h-3", isSelected ? "text-white" : "text-mw-orange")} />
                <span>{landmark.name}</span>
                <span
                  className={cn(
                    "text-[10px]",
                    isSelected ? "text-white/80" : "text-white/40"
                  )}
                >
                  · {landmark.category}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => setActiveLandmark(null)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs transition-all shrink-0 border",
              activeLandmark === null
                ? "bg-blue-600 text-white border-blue-600 font-semibold shadow-md shadow-blue-600/20"
                : "bg-white/5 text-white/60 hover:text-white border-white/10"
            )}
          >
            All {stateData.shortName} Territory View
          </button>
        </div>
      )}

      {/* Active Landmark Info Banner */}
      {activeLandmark && (
        <div className="px-5 md:px-6 py-2.5 bg-mw-orange/5 border-b border-mw-orange/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-white/90">
            <span className="font-bold text-mw-orange">{activeLandmark.name}:</span>
            <span className="text-white/70">{activeLandmark.description}</span>
          </div>
          <span className="text-[11px] font-mono text-white/50 shrink-0">
            Query: {activeLandmark.query}
          </span>
        </div>
      )}

      {/* Map Embed Frame */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] bg-black/60 overflow-hidden">
        <iframe
          title={`Google Map view of ${query}`}
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="border-0 w-full h-full filter saturate-125 contrast-110"
          src={mapSrc}
        />

        {/* Floating Territory Badge */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-3.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl space-y-1">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Mindware Coverage: All {stateData.lgasCount} LGAs</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono">
              {stateData.zone}
            </span>
          </div>
          <p className="text-[11px] text-white/60 leading-snug">
            Full-service digital agency support across {stateData.commercialHubs.slice(0, 4).join(", ")} and surrounding business corridors.
          </p>
        </div>
      </div>

      {/* Major Commercial Hubs Bar */}
      <div className="p-5 md:p-6 bg-white/[0.01] border-t border-white/5">
        <div className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-2.5">
          Key Commercial Towns & Municipal Hubs Served in {stateData.shortName}:
        </div>
        <div className="flex flex-wrap gap-2">
          {stateData.commercialHubs.map((hub) => (
            <span
              key={hub}
              className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 flex items-center gap-1.5"
            >
              <Building2 className="w-3 h-3 text-mw-orange" />
              <span>{hub}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
