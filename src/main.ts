import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// 1. Import the Grid Registry (keep if you use AG Grid)
import {
  AllCommunityModule as GridCommunityModule,
  ModuleRegistry as GridRegistry,
} from 'ag-grid-community';

// 2. Import the Charts Registry and AllCommunityModule
import {
  AllCommunityModule as ChartsCommunityModule,
  ModuleRegistry as ChartsRegistry,
} from 'ag-charts-community';

// Register AG Grid modules
GridRegistry.registerModules([GridCommunityModule]);

// Register AG Charts modules (This fixes your error)
ChartsRegistry.registerModules([ChartsCommunityModule]);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
