export interface AppState {
  show: boolean;
  message: string;
  type: string;
}

export declare const notifStore: {
  getState(): AppState;
  dispatch(action: any): any;
  subscribe(listener: () => void): () => void;
};

export declare const showNotification: (
  message: string,
  type?: string
) => (dispatch: (action: any) => void) => void;

export declare const hideNotification: () => { type: string };
