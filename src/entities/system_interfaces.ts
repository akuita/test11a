export interface SystemInterface {
  id: number;
  branding: string;
  navigation_links: any; // JSON type
  current_date_time: Date;
  check_in_button_enabled: boolean;
  status_label: string;
}