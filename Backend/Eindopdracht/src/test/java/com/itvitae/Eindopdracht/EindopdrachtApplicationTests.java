package com.itvitae.Eindopdracht;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EindopdrachtApplicationTests {

	@Test
	void contextLoads() {
		System.out.println("Hi Test!");
	}

	@Test
	void add() {
		assertEquals(2, (1 + 1));
	}

}
