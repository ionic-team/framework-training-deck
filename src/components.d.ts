/**
* This is an autogenerated file created by the Stencil compiler.
* It contains typing information for all components that exist in this project.
*/
/* tslint:disable */

import '@stencil/core';

import '@stencil/router';
import '@stencil/state-tunnel';
import {
  MatchResults,
} from '@stencil/router';


export namespace Components {

  interface AppHome {
    'match': MatchResults;
  }
  interface AppHomeAttributes extends StencilHTMLAttributes {
    'match'?: MatchResults;
  }

  interface AppMarkdown {
    'path': string;
  }
  interface AppMarkdownAttributes extends StencilHTMLAttributes {
    'path'?: string;
  }

  interface AppMenuItem {
    'item': any;
  }
  interface AppMenuItemAttributes extends StencilHTMLAttributes {
    'item'?: any;
  }

  interface AppMenu {
    'menu': any;
  }
  interface AppMenuAttributes extends StencilHTMLAttributes {
    'menu'?: any;
  }

  interface MyApp {}
  interface MyAppAttributes extends StencilHTMLAttributes {}
}

declare global {
  interface StencilElementInterfaces {
    'AppHome': Components.AppHome;
    'AppMarkdown': Components.AppMarkdown;
    'AppMenuItem': Components.AppMenuItem;
    'AppMenu': Components.AppMenu;
    'MyApp': Components.MyApp;
  }

  interface StencilIntrinsicElements {
    'app-home': Components.AppHomeAttributes;
    'app-markdown': Components.AppMarkdownAttributes;
    'app-menu-item': Components.AppMenuItemAttributes;
    'app-menu': Components.AppMenuAttributes;
    'my-app': Components.MyAppAttributes;
  }


  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppMarkdownElement extends Components.AppMarkdown, HTMLStencilElement {}
  var HTMLAppMarkdownElement: {
    prototype: HTMLAppMarkdownElement;
    new (): HTMLAppMarkdownElement;
  };

  interface HTMLAppMenuItemElement extends Components.AppMenuItem, HTMLStencilElement {}
  var HTMLAppMenuItemElement: {
    prototype: HTMLAppMenuItemElement;
    new (): HTMLAppMenuItemElement;
  };

  interface HTMLAppMenuElement extends Components.AppMenu, HTMLStencilElement {}
  var HTMLAppMenuElement: {
    prototype: HTMLAppMenuElement;
    new (): HTMLAppMenuElement;
  };

  interface HTMLMyAppElement extends Components.MyApp, HTMLStencilElement {}
  var HTMLMyAppElement: {
    prototype: HTMLMyAppElement;
    new (): HTMLMyAppElement;
  };

  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement
    'app-markdown': HTMLAppMarkdownElement
    'app-menu-item': HTMLAppMenuItemElement
    'app-menu': HTMLAppMenuElement
    'my-app': HTMLMyAppElement
  }

  interface ElementTagNameMap {
    'app-home': HTMLAppHomeElement;
    'app-markdown': HTMLAppMarkdownElement;
    'app-menu-item': HTMLAppMenuItemElement;
    'app-menu': HTMLAppMenuElement;
    'my-app': HTMLMyAppElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
