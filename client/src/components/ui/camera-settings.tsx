
import { Button } from "./button"
import { Camera } from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "./dropdown-menu"
import { Slider } from "./slider"
import { useMazeGame } from "@/lib/stores/useMazeGame"

export function CameraSettings() {
  const { cameraSettings, setCameraSettings } = useMazeGame();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
          <Camera className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black/90 border-secondary">
        <DropdownMenuLabel className="text-white">Camera Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-3 space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-white">Height</label>
            <Slider
              defaultValue={[cameraSettings.height]}
              onValueChange={([value]) => 
                setCameraSettings({ ...cameraSettings, height: value })}
              min={4}
              max={15}
              step={0.5}
              className="cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-white">Distance</label>
            <Slider
              defaultValue={[cameraSettings.distance]}
              onValueChange={([value]) => 
                setCameraSettings({ ...cameraSettings, distance: value })}
              min={2}
              max={8}
              step={0.5}
              className="cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-white">Field of View</label>
            <Slider
              defaultValue={[cameraSettings.fov]}
              onValueChange={([value]) => 
                setCameraSettings({ ...cameraSettings, fov: value })}
              min={60}
              max={90}
              step={1}
              className="cursor-pointer"
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
