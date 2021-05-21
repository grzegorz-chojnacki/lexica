package pl.edu.ug.inf.lexica.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import pl.edu.ug.inf.lexica.repository.TaskTypeRepository;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class TaskTypeTest {

    @Autowired
    private TaskTypeRepository taskTypeRepository;

    private TaskType taskType;

    @BeforeEach
    public void setUp() {
        taskType = new TaskType(1,"Simple Card","Easy task");
    }
    @Test
    void getName() {
        TaskType savedTaskType = taskTypeRepository.saveAndFlush(taskType);
        assertThat(savedTaskType.getName()).isEqualTo("Simple Card");

    }
    @Test
    void getId() {
        TaskType savedTaskType = taskTypeRepository.saveAndFlush(taskType);
        assertThat(savedTaskType.getId().equals(1));
    }

    @Test
    void getDescription() {
        TaskType savedTaskType = taskTypeRepository.saveAndFlush(taskType);
        assertThat(savedTaskType.getDescription()).isEqualTo("Easy task");
    }

    @Test
    void setId() {
        taskType.setId(2);
        TaskType savedTaskType = taskTypeRepository.saveAndFlush(taskType);
        assertThat(savedTaskType.getId().equals(2));
    }

    @Test
    void setName() {
        taskType.setName("Simple Card2");
        TaskType savedTaskType = taskTypeRepository.saveAndFlush(taskType);
        assertThat(savedTaskType.getName()).isEqualTo("Simple Card2");
    }

    @Test
    void setDescription() {
        taskType.setDescription("Easy task2");
        TaskType savedTaskType = taskTypeRepository.saveAndFlush(taskType);
        assertThat(savedTaskType.getDescription()).isEqualTo("Easy task2");
    }
//
//    @Test
//    void testEquals() {
//    }
//
//    @Test
//    void canEqual() {
//    }
//
//    @Test
//    void testHashCode() {
//    }
//
//    @Test
//    void testToString() {
//    }
}