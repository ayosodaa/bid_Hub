'use client';

import { useState } from 'react';
import { Badge } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { stageDefinitions, sectorList } from '@/lib/mock-data/entrepreneurs';
import { Plus, Pencil, Trash2, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const [addStageModalOpen, setAddStageModalOpen] = useState(false);
  const [addSectorModalOpen, setAddSectorModalOpen] = useState(false);

  const stages = Object.entries(stageDefinitions).map(([name, description]) => ({
    name,
    description,
  }));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-app-primary">Stages & Sectors</h2>
        <p className="text-[11px] text-app-secondary mt-0.5">Configure stages and sectors used across the platform</p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-3">
        {/* Stages */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Business stages</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-[10px] px-2 text-bid hover:text-bid hover:bg-bid/10"
              onClick={() => setAddStageModalOpen(true)}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add stage
            </Button>
          </div>
          <div className="space-y-2">
            {stages.map((stage, index) => (
              <div key={stage.name} className="flex items-start gap-3 p-2.5 rounded-lg bg-app-secondary">
                <div className="w-6 h-6 rounded-full bg-bid text-white flex items-center justify-center text-[10px] font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-app-primary">{stage.name}</div>
                  <div className="text-[10px] text-app-secondary mt-0.5">{stage.description}</div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Pencil className="w-3 h-3 text-app-tertiary" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Trash2 className="w-3 h-3 text-app-tertiary" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 rounded-lg bg-info/10 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-info flex-shrink-0 mt-0.5" />
            <div className="text-[10px] text-app-secondary">
              Stages represent business maturity. Changing stage names affects all entrepreneur profiles.
            </div>
          </div>
        </div>

        {/* Sectors */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Business sectors</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-[10px] px-2 text-bid hover:text-bid hover:bg-bid/10"
              onClick={() => setAddSectorModalOpen(true)}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add sector
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sectorList.map((sector) => (
              <div
                key={sector}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-app-secondary group"
              >
                <Badge
                  variant={
                    sector === 'Fintech' ? 'blue' :
                    sector === 'Agritech' ? 'green' :
                    sector === 'Healthtech' ? 'bid' :
                    'gray'
                  }
                  className="text-[10px]"
                >
                  {sector}
                </Badge>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Pencil className="w-2.5 h-2.5 text-app-tertiary" />
                </Button>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-2.5 h-2.5 text-app-tertiary" />
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 rounded-lg bg-info/10 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-info flex-shrink-0 mt-0.5" />
            <div className="text-[10px] text-app-secondary">
              Sectors are used to categorize businesses and assign sector-specific trainers.
            </div>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">Platform settings</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-app-secondary">
            <div>
              <div className="text-[11px] font-medium text-app-primary">Default max entrepreneurs per trainer</div>
              <div className="text-[10px] text-app-secondary">Used when creating new trainer profiles</div>
            </div>
            <Input type="number" className="w-16 h-7 text-[11px] text-center" defaultValue="10" />
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-app-secondary">
            <div>
              <div className="text-[11px] font-medium text-app-primary">Auto-assign self-registered entrepreneurs</div>
              <div className="text-[10px] text-app-secondary">Automatically assign to next available trainer</div>
            </div>
            <Select defaultValue="off">
              <SelectTrigger className="h-7 text-[10px] w-auto px-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="off">Off</SelectItem>
                <SelectItem value="on">On</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-app-secondary">
            <div>
              <div className="text-[11px] font-medium text-app-primary">Guest access default expiry (days)</div>
              <div className="text-[10px] text-app-secondary">Number of days before guest access expires</div>
            </div>
            <Input type="number" className="w-16 h-7 text-[11px] text-center" defaultValue="90" />
          </div>
        </div>
      </div>

      {/* Add Stage Modal */}
      {addStageModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-[400px]">
            <h3 className="text-[14px] font-medium text-app-primary mb-4">Add new stage</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-[10px] text-app-tertiary mb-1 block">Stage name</Label>
                <Input placeholder="e.g. Pre-seed" className="h-8 text-[11px]" />
              </div>
              <div>
                <Label className="text-[10px] text-app-tertiary mb-1 block">Description</Label>
                <Input placeholder="Brief description of this stage" className="h-8 text-[11px]" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" size="sm" onClick={() => setAddStageModalOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" className="bg-bid text-white hover:bg-bid/90" onClick={() => {
                toast.success('Stage added!');
                setAddStageModalOpen(false);
              }}>
                Add stage
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sector Modal */}
      {addSectorModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-[400px]">
            <h3 className="text-[14px] font-medium text-app-primary mb-4">Add new sector</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-[10px] text-app-tertiary mb-1 block">Sector name</Label>
                <Input placeholder="e.g. Cleantech" className="h-8 text-[11px]" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" size="sm" onClick={() => setAddSectorModalOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" className="bg-bid text-white hover:bg-bid/90" onClick={() => {
                toast.success('Sector added!');
                setAddSectorModalOpen(false);
              }}>
                Add sector
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
