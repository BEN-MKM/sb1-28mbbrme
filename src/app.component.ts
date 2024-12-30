import { Component } from '@nativescript/core';
import { Layout } from './components/Layout';

@Component({
  template: `
    <Frame>
      <Page>
        <Layout />
      </Page>
    </Frame>
  `
})
export class AppComponent {}