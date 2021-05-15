package pl.edu.ug.inf.lexica.api;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@Controller
class IndexController {
    @RequestMapping(value = "/**/{path:[^.]*}")
    public String redirect() {
        return "forward:/";
    }
}