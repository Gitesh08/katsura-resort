import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css']
})
export class AdminCalendarComponent implements OnInit {
  calendarDays: any[] = [];
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  constructor(private guestService: GuestService) {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    this.guestService.getGuests().subscribe((guests) => {
      const firstDay = new Date(
        this.currentYear,
        this.currentMonth,
        1,
      ).getDay();
      const daysInMonth = new Date(
        this.currentYear,
        this.currentMonth + 1,
        0,
      ).getDate();
      this.calendarDays = [];
      for (let i = 0; i < firstDay; i++) {
        this.calendarDays.push({ day: '', booked: false });
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(this.currentYear, this.currentMonth, day)
          .toISOString()
          .split('T')[0];
        const booked = guests.some(
          (g) => g.checkIn <= date && (!g.checkOut || g.checkOut >= date),
        );
        this.calendarDays.push({ day, booked });
      }
    });
  }

  changeMonth(offset: number) {
    this.currentMonth += offset;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }
}
