"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { UploadCloud, Loader2, X } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  value: string | null;
  onChange: (url: string) => void;
  aspect?: string; // e.g. 'aspect-square', 'aspect-[3/1]'
  hint?: string;
}

export default function ImageUpload({ label, value, onChange, aspect = 'aspect-square', hint }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File) => {
    setError('');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Upload failed');
        return;
      }
      onChange(json.url);
    } catch {
      setError('Network error — try again');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-label-sm font-bold text-on-surface uppercase tracking-wider">{label}</label>

      <div
        className={`relative ${aspect} w-full rounded-xl overflow-hidden border-2 border-dashed border-outline-variant bg-surface-container hover:border-primary cursor-pointer transition-colors group`}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        {value ? (
          <>
            <Image src={value} alt={label} fill className="object-cover" unoptimized sizes="(max-width: 640px) 100vw, 400px" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label={`Remove ${label}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
            {!uploading && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full transition-opacity">
                  Change
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant">
            {uploading ? (
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            ) : (
              <>
                <UploadCloud className="w-7 h-7 mb-1.5 text-outline" />
                <span className="text-xs font-semibold">Click to upload</span>
              </>
            )}
          </div>
        )}
      </div>

      {hint && <p className="text-[11px] text-on-surface-variant">{hint}</p>}
      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = '';
        }}
      />
    </div>
  );
}
