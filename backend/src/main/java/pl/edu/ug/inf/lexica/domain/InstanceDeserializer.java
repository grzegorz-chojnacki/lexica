package pl.edu.ug.inf.lexica.domain;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;

public class InstanceDeserializer extends JsonDeserializer<Example> {
    @Override
    public Example deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
        ObjectMapper mapper = (ObjectMapper) jp.getCodec();
        ObjectNode root = mapper.readTree(jp);
        Class<? extends Example> instanceClass;

        if (root.has("foreignWord")) {
            instanceClass = SimpleCard.class;
        } else if (root.has("answer")) {
            instanceClass = ChoiceTest.class;
        }else {
            instanceClass=MultiTest.class;
        }

        return mapper.convertValue(root, instanceClass);
    }
}