import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
  @Input() userInfo: any = { name: 'Unknown', role: 'Guest', email: '' };

  showAddStaffModal = false;
  newStaff = { email: '', name: '', role: '' };

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {}

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
    } else {
      console.warn('⚠️ Please fill all fields correctly.');
    }
  }
}
