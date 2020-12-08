import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/classes/user'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  public avatarURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4HDw0PExAREhAXEQ0XEBEQDhARFQ8WIBgXFiATFR8YHiosGSYmHRgTLT0tJTUrLi4uFyszODM4NygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAGAAYAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQGBQMC/8QAMBAAAgECAwIOAgMAAAAAAAAAAAECAwQFEUExURQhIjJCYXGBkbHB0fDxBhIToeH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3oAAAAAAAAAAAAAAAAAAAF3CbThU+PmrJy69y+bgPuxwuVzlJ8mOj1fYdWnhNCHRz6236F5LIAUqmFUJ9HLri36nJvsLlbJyjyo670aMAYwF/F7RW081zZZtdT1XkUAAAAAAAaDAIZUpPfJ+n+mfO9+P1M4TjqpZ9z+mB1gQAJBAA5uPQ/aknukvYzx38fq/rTjHVy/pfEcAAAAAAAFixunaTUtNjW9fPIrntbW07p5RXa9EBqqVWNaKlF5p7D7KWHYfwPj/AGbeq2R8C8BB81akaKcm8ktrPso4hYcMy5TTWxbY+AHCv7p3c3LTZFbkVj2ubadq8pLsejPEAAADAAFiytZXc1FbOk9yNPb0I28VGKyXmeGGWvBaaT5zycvYtgASQAAJA8rihG4i4yWa8uwzF7au0m4vZ0XvRqypidrwqm10lm4+wGXAAAt4XR/nqwWieb7uP2KjOt+PQznUluSXj9Ad4EACQQAJBAAkEADL4pR/gqzWj4138fuVDr/kMMpU5b4teH2cgD//2Q=='
  public user!: User

  public constructor(private userService: UserService) { }

  public ngOnInit(): void {
    this.userService.loggedUser.subscribe(user => this.user = user)
  }
}
