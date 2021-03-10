package pl.edu.ug.inf.lexica.domain;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;

public class InstanceDeserializer extends JsonDeserializer<Example> {
    @Override
    public Example deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        ObjectMapper mapper = (ObjectMapper) jp.getCodec();
        ObjectNode root = (ObjectNode) mapper.readTree(jp);
        Class<? extends Example> instanceClass = null;

        if (root.has("foreignWord")) {
            instanceClass = SimpleCard.class;
        } else {
            instanceClass = ChoiceTest.class;
        }
        if (instanceClass == null) {
            return null;
        }
        return mapper.convertValue(root, instanceClass);
    }
}