import unittest

class TestSample(unittest.TestCase):
    def test_addition(self):
        self.assertEqual(1 + 1, 2)

    def test_subtraction(self):
        self.assertEqual(10 - 5, 5)

    def test_fail_case(self):
        self.assertNotEqual(3 * 3, 10)

if __name__ == '__main__':
    unittest.main()
