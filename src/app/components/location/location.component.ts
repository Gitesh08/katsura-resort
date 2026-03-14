import { Component } from "@angular/core";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"],
})
export class LocationComponent {
  mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1573.013568541845!2d-122.0842499!3d37.4220656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKatsura%20Resort!5e0!3m2!1sen!2sus!4v1743435953487!5m2!1sen!2sus";
  address =
    "Katsura's Resort, 123 serene lane, Mountain view, CA 94043, USA";

  directions = [
    {
      mode: "car",
      icon: "fa-car",
      title: "By Car",
      description:
        "Approximately 2 hours drive from Mumbai via NH48 and Kelva Beach Road",
    },
    {
      mode: "train",
      icon: "fa-train",
      title: "By Train",
      description:
        "Take a train to Palghar Station, then a 20-minute auto-rickshaw ride to the resort",
    },
    {
      mode: "bus",
      icon: "fa-bus",
      title: "By Bus",
      description:
        "Regular buses from Mumbai to Palghar, followed by a short auto-rickshaw ride",
    },
  ];
}
