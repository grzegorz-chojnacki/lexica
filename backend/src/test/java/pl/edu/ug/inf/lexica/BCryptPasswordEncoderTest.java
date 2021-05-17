package pl.edu.ug.inf.lexica;

import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.security.SecureRandom;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatIllegalArgumentException;

public class BCryptPasswordEncoderTest {
    @Test
    public void emptyRawPasswordDoesNotMatchPassword() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String result = encoder.encode("password");
        assertThat(encoder.matches("", result)).isFalse();
    }

    @Test
    public void $2y() {
        // $2y is default version
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String result = encoder.encode("password");
        assertThat(result.equals("password")).isFalse();
        assertThat(encoder.matches("password", result)).isTrue();
    }

    @Test
    public void $2a() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2A);
        String result = encoder.encode("password");
        assertThat(result.equals("password")).isFalse();
        assertThat(encoder.matches("password", result)).isTrue();
    }

    @Test
    public void $2b() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2B);
        String result = encoder.encode("password");
        assertThat(result.equals("password")).isFalse();
        assertThat(encoder.matches("password", result)).isTrue();
    }

    @Test
    public void $2yUnicode() {
        // $2y is default version
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String result = encoder.encode("passw\u9292rd");
        assertThat(encoder.matches("pass\u9292\u9292rd", result)).isFalse();
        assertThat(encoder.matches("passw\u9292rd", result)).isTrue();
    }

    @Test
    public void $2aUnicode() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2A);
        String result = encoder.encode("passw\u9292rd");
        assertThat(encoder.matches("pass\u9292\u9292rd", result)).isFalse();
        assertThat(encoder.matches("passw\u9292rd", result)).isTrue();
    }

    @Test
    public void $2bUnicode() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2B);
        String result = encoder.encode("passw\u9292rd");
        assertThat(encoder.matches("pass\u9292\u9292rd", result)).isFalse();
        assertThat(encoder.matches("passw\u9292rd", result)).isTrue();
    }

    @Test
    public void $2yNotMatches() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String result = encoder.encode("password");
        assertThat(encoder.matches("other", result)).isFalse();
    }

    @Test
    public void $2aNotMatches() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2A);
        String result = encoder.encode("password");
        assertThat(encoder.matches("other", result)).isFalse();
    }

    @Test
    public void $2bNotMatches() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2B);
        String result = encoder.encode("password");
        assertThat(encoder.matches("other", result)).isFalse();
    }

    @Test
    public void $2yCustomStrength() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(8);
        String result = encoder.encode("password");
        assertThat(encoder.matches("password", result)).isTrue();
    }

    @Test
    public void $2aCustomStrength() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2A, 8);
        String result = encoder.encode("password");
        assertThat(encoder.matches("password", result)).isTrue();
    }

    @Test
    public void $2bCustomStrength() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2B, 8);
        String result = encoder.encode("password");
        assertThat(encoder.matches("password", result)).isTrue();
    }

    @Test
    public void badLowCustomStrength() {
        assertThatIllegalArgumentException().isThrownBy(() -> new BCryptPasswordEncoder(3));
    }

    @Test
    public void badHighCustomStrength() {
        assertThatIllegalArgumentException().isThrownBy(() -> new BCryptPasswordEncoder(32));
    }

    @Test
    public void customRandom() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(8, new SecureRandom());
        String result = encoder.encode("password");
        assertThat(encoder.matches("password", result)).isTrue();
    }

    @Test
    public void notMatchNullEncodedValue() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        assertThat(encoder.matches("password", null)).isFalse();
    }

    @Test
    public void notMatchEmptyEncodedValue() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        assertThat(encoder.matches("password", "")).isFalse();
    }

    @Test
    public void notMatchBogusEncodedValue() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        assertThat(encoder.matches("password", "012345678901234567890123456789")).isFalse();
    }

    @Test
    public void upgradeFromLowerStrength() {
        BCryptPasswordEncoder weakEncoder = new BCryptPasswordEncoder(5);
        BCryptPasswordEncoder strongEncoder = new BCryptPasswordEncoder(15);
        String weakPassword = weakEncoder.encode("password");
        String strongPassword = strongEncoder.encode("password");
        assertThat(weakEncoder.upgradeEncoding(strongPassword)).isFalse();
        assertThat(strongEncoder.upgradeEncoding(weakPassword)).isTrue();
    }

    @Test
    public void upgradeFromNullOrEmpty() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        assertThat(encoder.upgradeEncoding(null)).isFalse();
        assertThat(encoder.upgradeEncoding("")).isFalse();
    }

    @Test
    public void upgradeFromNonBCrypt() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        assertThatIllegalArgumentException().isThrownBy(() -> encoder.upgradeEncoding("not-a-bcrypt-password"));
    }

    @Test
    public void encodeNullRawPasswordThrowsException() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        assertThatIllegalArgumentException().isThrownBy(() -> encoder.encode(null));
    }

    @Test
    public void matchNullRawPasswordThrowsException() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        assertThatIllegalArgumentException().isThrownBy(() -> encoder.matches(null, "something-else"));
    }
}
