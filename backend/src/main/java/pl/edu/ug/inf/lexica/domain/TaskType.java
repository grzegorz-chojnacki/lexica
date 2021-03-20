package pl.edu.ug.inf.lexica.domain;

import lombok.*;

import javax.persistence.*;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
public class TaskType {
    @Id
    @NonNull
    private Integer id;

    @NonNull
    private String name;

    @NonNull
    private String description;
}
