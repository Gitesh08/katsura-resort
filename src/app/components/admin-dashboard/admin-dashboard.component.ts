import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  currentDate: string = new Date().toISOString().split("T")[0];
  userInfo: any = { name: "Unknown", role: "Guest", email: "" };
  activeTab: string = "dashboard";
  sidebarCollapsed: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user?.uid) {
        this.authService
          .getAdminData(user.uid)
          .then((data) => {
            if (data) {
              this.userInfo.name = data.name || "Admin";
              this.userInfo.role = data.role || "Guest";
              this.userInfo.email = data.email || "";
            } else {
              console.warn("⚠️ No user profile found");
            }
          })
          .catch((err) => {
            console.error("🚫 Error fetching profile:", err);
          });
      }
    });
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
