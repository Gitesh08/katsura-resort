import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GuestService } from 'src/app/services/guest.service';
import { StaffService } from 'src/app/services/staff.service';
import { GuestTableComponent } from '../guest-table/guest-table.component';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css']
})
export class AdminOverviewComponent implements OnInit {
  @ViewChild(GuestTableComponent) guestTable!: GuestTableComponent;

  currentDate: string = new Date().toISOString().split('T')[0];
  summaryMetrics: any = { checkIns: 0, checkOuts: 0, pending: 0 };
  roomAvailability: any = { single: 0, double: 0, suite: 0 };

  // Guest modal
  showAddGuestModal = false;
  showGuestPreviewModal = false;
  previewGuest: any = null;
  minCheckOutDate: string = this.currentDate;
  newGuest: any = {};

  // Staff modal
  showAddStaffModal = false;
  newStaff = { email: '', name: '', role: '' };

  constructor(
    public guestService: GuestService,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    this.newGuest = this.getEmptyGuest();

    this.guestService
      .getSummaryMetrics(this.currentDate)
      .subscribe((metrics) => {
        this.summaryMetrics = metrics;
      });

    this.guestService
      .getRoomAvailability(this.currentDate)
      .subscribe((availability) => {
        this.roomAvailability = availability;
      });
  }

  getEmptyGuest() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return {
      id: '',
      name: '',
      email: '',
      mobile: '',
      roomType: '',
      roomNumber: '',
      numberOfGuests: 1,
      checkIn: today.toISOString().split('T')[0],
      checkOut: tomorrow.toISOString().split('T')[0],
      status: '',
      idType: '',
      idNumber: '',
      avatarColor: this.guestService.getRandomColor(),
    };
  }

  // Guest operations
  openAddGuestModal(guest?: any) {
    if (guest) {
      this.newGuest = { ...guest };
      this.minCheckOutDate = guest.checkIn || this.currentDate;
    } else {
      this.newGuest = this.getEmptyGuest();
      this.minCheckOutDate = this.currentDate;
    }
    this.showAddGuestModal = true;
  }

  closeAddGuestModal() {
    this.showAddGuestModal = false;
  }

  addGuest(form: NgForm) {
    this.guestService
      .addGuest(this.newGuest)
      .then((result) => {
        this.guestTable.showNotification(result.message, 'success');
        this.closeAddGuestModal();
        this.refreshMetrics();
      })
      .catch((error) => {
        this.guestTable.showNotification(error.message, 'error');
      });
  }

  openGuestPreviewModal(guest: any) {
    this.previewGuest = guest;
    this.showGuestPreviewModal = true;
  }

  closeGuestPreviewModal() {
    this.showGuestPreviewModal = false;
    this.previewGuest = null;
  }

  updateCheckOutMin() {
    this.minCheckOutDate = this.newGuest.checkIn || this.currentDate;
    if (this.newGuest.checkOut && this.newGuest.checkOut < this.minCheckOutDate) {
      const checkInDate = new Date(this.newGuest.checkIn);
      const nextDay = new Date(checkInDate);
      nextDay.setDate(checkInDate.getDate() + 1);
      this.newGuest.checkOut = nextDay.toISOString().split('T')[0];
    }
  }

  sendReminder(guestId: string) {
    this.guestService.sendReminder(guestId);
  }

  exportGuests() {
    this.guestService.exportToCSV();
  }

  // Staff operations
  openAddStaffModal() {
    this.newStaff = { email: '', name: '', role: '' };
    this.showAddStaffModal = true;
  }

  closeAddStaffModal() {
    this.showAddStaffModal = false;
  }

  addStaff(form: NgForm) {
    if (form.valid) {
      this.staffService
        .addStaff(this.newStaff)
        .then(() => {
          console.log('✅ Staff added successfully!');
          this.closeAddStaffModal();
        })
        .catch((err) => {
          console.error('❌ Failed to add staff:', err);
        });
    }
  }

  refreshMetrics() {
    this.guestService
      .getSummaryMetrics(this.currentDate)
      .subscribe((metrics) => {
        this.summaryMetrics = metrics;
      });
    this.guestService
      .getRoomAvailability(this.currentDate)
      .subscribe((availability) => {
        this.roomAvailability = availability;
      });
  }
}
