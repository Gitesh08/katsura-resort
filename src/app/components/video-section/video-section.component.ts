// video-section.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-video-section",
  templateUrl: "./video-section.component.html",
  styleUrls: ["./video-section.component.css"],
})
export class VideoSectionComponent {
  videoUrl =
    "https://www.youtube-nocookie.com/embed/9XqrYOCt9M0?si=OuVNq1F_be2UdMT3&autoplay=1";
  videoTitle = "Through Our Guest’s Lens";
  videoDescription =
    "Watch how a guest enjoyed their time at Katsura’s Resort.";
  thumbnailUrl = "https://img.youtube.com/vi/9XqrYOCt9M0/maxresdefault.jpg";
  showVideo = false;

  playVideo() {
    this.showVideo = true;
  }
}
