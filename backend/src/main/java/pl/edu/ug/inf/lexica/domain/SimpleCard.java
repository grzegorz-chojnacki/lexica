package pl.edu.ug.inf.lexica.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@RequiredArgsConstructor
public class SimpleCard extends Example {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NonNull
    private String nativeWord;

    @NonNull
    private String foreignWord;
}
