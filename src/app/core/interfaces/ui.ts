export interface EntityUI {
  id?: number;
  name: string;
  data: any;
  dialogs: {
    addEdit: any;
    details?: any;
  };
}
