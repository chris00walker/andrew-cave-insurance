"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Pen, Type, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartSignatureProps {
  id: string;
  name: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  readOnly?: boolean;
  defaultValue?: string;
}

interface SignatureCapabilities {
  hasTouch: boolean;
  hasPen: boolean;
  hasPointerEvents: boolean;
  isPrecisionPointer: boolean;
}

export function SmartSignature({
  id,
  name,
  value = "",
  onChange,
  onBlur,
  placeholder = "Sign here",
  required = false,
  error,
  className,
  readOnly = false,
  defaultValue = "",
}: SmartSignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureMode, setSignatureMode] = useState<'draw' | 'type'>('type');
  const [capabilities, setCapabilities] = useState<SignatureCapabilities>({
    hasTouch: false,
    hasPen: false,
    hasPointerEvents: false,
    isPrecisionPointer: false,
  });
  const [hasDrawnSignature, setHasDrawnSignature] = useState(false);
  const [typedValue, setTypedValue] = useState(defaultValue || value);

  // Detect device capabilities
  useEffect(() => {
    const detectCapabilities = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const hasPointerEvents = 'PointerEvent' in window;
      const hasPen = navigator.maxTouchPoints > 1; // Rough pen detection
      
      // More sophisticated pen detection
      let isPrecisionPointer = false;
      if (hasPointerEvents) {
        const testPointer = (e: PointerEvent) => {
          isPrecisionPointer = e.pointerType === 'pen' || (e.pressure > 0 && e.pointerType !== 'touch');
        };
        window.addEventListener('pointerdown', testPointer, { once: true, passive: true });
      }

      const caps: SignatureCapabilities = {
        hasTouch,
        hasPen,
        hasPointerEvents,
        isPrecisionPointer,
      };

      setCapabilities(caps);

      // Smart default: prefer drawing if touch/pen available
      if (hasTouch || hasPen) {
        setSignatureMode('draw');
      }
    };

    detectCapabilities();
  }, []);

  // Canvas drawing functions
  const startDrawing = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (readOnly) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = '#1f2937'; // gray-800
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [readOnly]);

  const draw = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || readOnly) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }, [isDrawing, readOnly]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    setHasDrawnSignature(true);
    
    // Convert canvas to data URL and update form value
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      onChange(dataURL);
    }
  }, [isDrawing, onChange]);

  // Clear signature
  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setHasDrawnSignature(false);
    setTypedValue('');
    onChange('');
  }, [onChange]);

  // Handle typed signature
  const handleTypedChange = (newValue: string) => {
    setTypedValue(newValue);
    onChange(newValue);
  };

  // Switch between modes
  const switchToType = () => {
    setSignatureMode('type');
    clearSignature();
  };

  const switchToDraw = () => {
    setSignatureMode('draw');
    setTypedValue('');
    onChange('');
  };

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && signatureMode === 'draw') {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        // Set initial styles
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [signatureMode]);

  if (readOnly) {
    return (
      <div className={cn("space-y-2", className)}>
        <Label htmlFor={id} className="text-sm font-medium text-gray-700">
          {placeholder}
        </Label>
        <div className="relative">
          <Textarea
            id={id}
            name={name}
            value={typedValue}
            readOnly
            className="min-h-[80px] resize-none font-serif text-lg italic border-2 border-solid border-green-300 bg-green-50/30 text-green-800 cursor-not-allowed"
          />
          <div className="absolute bottom-2 right-2 text-xs text-green-600">
            Authorized Signature
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium text-gray-700">
          {placeholder} {required && "*"}
        </Label>
        
        {/* Smart mode switching - only show if both modes are viable */}
        {capabilities.hasTouch && (
          <div className="flex gap-1">
            <Button
              type="button"
              variant={signatureMode === 'draw' ? 'default' : 'ghost'}
              size="sm"
              onClick={switchToDraw}
              className="h-8 px-2"
            >
              <Pen className="h-3 w-3" />
            </Button>
            <Button
              type="button"
              variant={signatureMode === 'type' ? 'default' : 'ghost'}
              size="sm"
              onClick={switchToType}
              className="h-8 px-2"
            >
              <Type className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      <div className="relative">
        {signatureMode === 'draw' ? (
          <Card className="border-2 border-dashed border-blue-300 bg-blue-50/30">
            <CardContent className="p-4">
              <canvas
                ref={canvasRef}
                id={id}
                className="w-full h-20 cursor-crosshair touch-none"
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
                style={{ touchAction: 'none' }}
              />
              {!hasDrawnSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-sm text-gray-400 font-serif italic">
                    {capabilities.hasPen ? "Sign with your stylus" : "Sign with your finger"}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Textarea
            id={id}
            name={name}
            value={typedValue}
            onChange={(e) => handleTypedChange(e.target.value)}
            onBlur={onBlur}
            placeholder="Type your full legal name as your digital signature"
            className="min-h-[80px] resize-none font-serif text-lg italic border-2 border-dashed border-blue-300 focus:border-blue-500 focus:ring-blue-500/20 bg-blue-50/30"
            required={required}
          />
        )}

        {/* Clear/Reset button */}
        {(hasDrawnSignature || typedValue) && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSignature}
            className="absolute top-2 right-2 h-6 w-6 p-0"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        )}

        {/* Signature indicator */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          {signatureMode === 'draw' ? 'Digital Signature' : 'Typed Signature'}
        </div>
      </div>

      {/* Fallback option - subtle */}
      {signatureMode === 'draw' && !hasDrawnSignature && capabilities.hasTouch && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={switchToType}
          className="text-xs text-gray-500 h-6"
        >
          Prefer to type your name instead?
        </Button>
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
