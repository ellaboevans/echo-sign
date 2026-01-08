"use client";

import { store } from "@/store/store";
import { useTenant } from "@/store/tenant-context";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const { tenant } = useTenant();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (tenant) {
      const analytics = store.getAnalyticsByTenant(tenant.id);
      setEvents(analytics.sort((a, b) => b.timestamp - a.timestamp));
    }
  }, [tenant]);

  const eventCounts = events.reduce(
    (acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-stone-900">Analytics</h1>
        <p className="text-stone-600 mt-2">Track visitor and signature activity</p>
      </div>

      {/* Event Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(eventCounts).map(([eventType, count]) => (
          <div
            key={eventType}
            className="bg-white p-6 rounded-lg border border-stone-200">
            <p className="text-3xl font-bold text-amber-700">{count}</p>
            <p className="text-sm text-stone-600 mt-2 capitalize">
              {eventType.replace(/_/g, " ")}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-lg border border-stone-200 p-6">
        <h2 className="text-xl font-bold text-stone-900 mb-4">Recent Events</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {events.slice(0, 20).map((event) => (
            <div
              key={event.id}
              className="flex justify-between items-center p-3 bg-stone-50 rounded text-sm">
              <span className="font-semibold capitalize text-stone-900">
                {event.type.replace(/_/g, " ")}
              </span>
              <span className="text-stone-500">
                {new Date(event.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
