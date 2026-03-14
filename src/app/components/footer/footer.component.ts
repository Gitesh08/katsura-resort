import { Component } from "@angular/core";
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  navLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Rooms", id: "tariffs" },
    { name: "Amenities", id: "gallery" },
    { name: "Location", id: "location" },
    { name: "FAQ", id: "faq" },
    { name: "Contact", id: "contact" },
  ];
  socialLinks = [
    {
      icon: "fa-facebook",
      url: "javascript:void(0)",
    },
    { icon: "fa-instagram", url: "javascript:void(0)" },
    {
      icon: "fa-brands fa-linkedin",
      url: "javascript:void(0)",
    },
  ];

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  contactInfo = {
    phone: "+91 9876543210",
    email: "contact@katsura-resort.com",
    address:
      "123 serene lane, Mountain view, CA 94043, USA",
  };
  currentYear = new Date().getFullYear();
}
